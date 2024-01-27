import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { PeticionAltaUser } from 'src/app/models/PeticionAltaUser';
@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css'],
})
export class AltausuarioComponent implements OnInit {
  public altaUsuarios: any[] = [];
  public peticionesAltaUsuarios!: PeticionAltaUser[];
  public role!: number | null;
  public peticionesCargadas: boolean = false;

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) this.cargarDatos();
    else this._router.navigate(['/']);
  }

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  cargarDatos() {
    this.peticionesCargadas = false;
    this.altaUsuarios = [];
    this._service.getPeticionesAltaUser().subscribe((response) => {
      this.peticionesAltaUsuarios = response;
      this._service.getUsuarios().subscribe((response) => {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < this.peticionesAltaUsuarios.length; j++) {
            if (
              this.peticionesAltaUsuarios[j].idUser == response[i].idUsuario
            ) {
              this.altaUsuarios.push({
                idPeticionAltaUsers:
                  this.peticionesAltaUsuarios[j].idPeticionAltaUsers,
                idUser: this.peticionesAltaUsuarios[j].idUser,
                idTipoPeticionCategoria:
                  this.peticionesAltaUsuarios[j].idTipoPeticionCategoria,
                nombre: response[i].nombre,
                apellidos: response[i].apellidos,
                email: response[i].email,
              });
              break;
            }
          }
          this.peticionesCargadas = true;
        }
      });
    });
  }

  cambiarEstadoUsuario(idUsuario: number, idPeticion: number) {
    this._service.cambiarEstadoUsuario(idUsuario).subscribe((response) => {
      this._service
        .eliminarPeticionUsuario(idPeticion)
        .subscribe((response) => {
          this.cargarDatos();
        });
    });
  }

  eliminarPeticionUsuario(idUsuario: number, idPeticion: number) {
    this._service.eliminarPeticionUsuario(idPeticion).subscribe((response) => {
      this._service.deleteUsuario(idUsuario).subscribe((response) => {
        this.cargarDatos();
      });
    });
  }
}

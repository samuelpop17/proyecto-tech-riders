import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { PeticionCentroEmpresa } from 'src/app/models/PeticionCentroEmpresa';

@Component({
  selector: 'app-altaempresa',
  templateUrl: './altaempresa.component.html',
  styleUrls: ['./altaempresa.component.css'],
})
export class AltaempresaComponent implements OnInit {
  public altaEmpresa: any[] = [];
  public peticionesAltaEmpresa!: PeticionCentroEmpresa[];
  public role!: number | null;
  public peticionesCargadas: boolean = false;

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) this.cargarDatos();
  }

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  cargarDatos() {
    this.peticionesCargadas = false;
    this.altaEmpresa = [];
    this._service.getPeticionesCentroEmpresa().subscribe((response) => {
      this.peticionesAltaEmpresa = response;
      this._service.getEmpresasCentros().subscribe((response) => {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < this.peticionesAltaEmpresa.length; j++) {
            if (
              this.peticionesAltaEmpresa[j].idCentroEmpresa ==
              response[i].idEmpresaCentro
            ) {
              this.altaEmpresa.push({
                idPeticionCentroEmpresa:
                  this.peticionesAltaEmpresa[j].idPeticionCentroEmpresa,
                idCentroEmpresa: this.peticionesAltaEmpresa[j].idCentroEmpresa,
                idTipoPeticionCategoria:
                  this.peticionesAltaEmpresa[j].idTipoPeticionCategoria,
                nombre: response[i].nombre,
                cif: response[i].cif,
                direccion: response[i].direccion,
                personaContacto: response[i].personaContacto,
                telefono: response[i].telefono,
              });
              break;
            }
          }
        }
        this.peticionesCargadas = true;
      });
    });
  }

  cambiarEstadoEmpresa(idEmpresa: number, idPeticion: number) {
    this._service.cambiarEstadoEmpresa(idEmpresa).subscribe((response) => {
      this._service.deletePeticionEmpresa(idPeticion).subscribe((response) => {
        this._service.actualizacionPeticiones();
        this.cargarDatos();
      });
    });
  }

  eliminarPeticionEmpresa(idEmpresa: number, idPeticion: number) {
    this._service.deletePeticionEmpresa(idPeticion).subscribe((response) => {
      this._service.deleteEmpresaCentro(idEmpresa).subscribe((response) => {
        this._service.actualizacionPeticiones();
        this.cargarDatos();
      });
    });
  }
}

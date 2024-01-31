import { Component, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { DetallesEstadoCharlaTech } from 'src/app/models/DetallesEstadoCharlaTechRiders';
import { Router } from '@angular/router';
import { TechRider } from 'src/app/models/techRider';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mischarrlas-techriders',
  templateUrl: './mischarrlas-techriders.component.html',
  styleUrls: ['./mischarrlas-techriders.component.css'],
})
export class MischarrlasTechridersComponent implements OnInit {
  public charlasCargadas: boolean = false;
  public role!: number | null;
  public charlas: DetallesEstadoCharlaTech[] = [];

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      if (this.role == 3 || this.role == 4) {
        this._service.estadoCharlasTechRiders().subscribe((response) => {
          this.charlas = response;
          this.charlasCargadas = true;
        });
      } else this._router.navigate(['/usuario/perfil']);
    } else this._router.navigate(['/login']);
  }

  anularCharla(idCharla: number) {
    this._service
      .asignarseUnaCharlaTechRider(0, idCharla)
      .subscribe((response) => {
        this._router
          .navigate(['/usuario/perfil'], { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/mischarlastech']);
          });
      });
  }

  acreditarCharla(idCharla: number) {
    this._service
      .createSolicitudAcreditacionCharla(idCharla)
      .subscribe((response) => {
        this._service.actualizacionPeticiones();
        this._router
          .navigate(['/usuario/perfil'], { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/mischarlastech']);
          });
      });
  }

  reasignarCharla(idCharla: number) {
    this._service.getPerfilUsuario().subscribe((response) => {
      this._service
        .getMisTechRidersResponsable(response.idEmpresaCentro)
        .subscribe(async (response) => {
          let usuarios: TechRider[] = response;
          let opciones: any = [];
          usuarios.forEach((usuario) => {
            opciones[usuario.idTechRider] = usuario.techRider;
          });
          const { value: techRider } = await Swal.fire({
            cancelButtonColor: '#212529',
            cancelButtonText: 'Cancelar',
            color: '#333333',
            confirmButtonColor: '#212529',
            confirmButtonText: 'Asignar',
            input: 'select',
            title: 'Reasignar charla',
            html: `<p class='text-muted text-center'>Reasigna esta charla asignada a ti a un TechRider de tu empresa</p>`,
            inputOptions: opciones,
            showCancelButton: true,
            inputValidator: (value) => {
              return new Promise((resolve) => {
                resolve();
              });
            },
          });
          if (techRider) {
            this._service
              .asignarseUnaCharlaTechRider(techRider, idCharla)
              .subscribe((response) => {
                this._router
                  .navigate(['/usuario/perfil'], { skipLocationChange: true })
                  .then(() => {
                    this._router.navigate(['/charlas-empleados-empresa']);
                  });
              });
          }
        });
    });
  }
}

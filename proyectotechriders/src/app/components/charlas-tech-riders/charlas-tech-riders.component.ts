import { Component, OnInit } from '@angular/core';
import { CharlasPendientes } from 'src/app/models/CharlasPendientesTechRiders';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceCharlas } from 'src/app/services/service.charlas';

@Component({
  selector: 'app-charlas-tech-riders',
  templateUrl: './charlas-tech-riders.component.html',
  styleUrls: ['./charlas-tech-riders.component.css'],
})
export class CharlasTechRidersComponent implements OnInit {
  public charlasCargadas: boolean = false;
  public charlas: CharlasPendientes[] = [];
  public role!: number | null;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceCharlas: ServiceCharlas,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 3 || this.role == 4) {
      this._serviceQueryTools
        .charlasPorVerTechRiders()
        .subscribe((response) => {
          this.charlas = response;
          this.charlasCargadas = true;
        });
    } else this._router.navigate(['/usuario/perfil']);
  }

  asignarCharla(idcharla: number) {
    if (localStorage.getItem('idUsuario')) {
      Swal.fire({
        cancelButtonText: 'No',
        color: '#333333',
        confirmButtonColor: '#212529',
        confirmButtonText: 'Si, asignarse',
        icon: 'question',
        showCancelButton: true,
        text: 'Pasarás a hablar con el profesor sobre los detalles de la charla. Podrás desasignarte si quieres',
        title: 'Asignarse a esta charla',
      }).then((result) => {
        if (result.isConfirmed) {
          let idUsuario = parseInt(localStorage.getItem('idUsuario') ?? '0');
          this._serviceCharlas
            .asignarseUnaCharlaTechRider(idUsuario, idcharla)
            .subscribe((response) => {
              this._serviceCharlas
                .updateEstadoCharla(idcharla, 3)
                .subscribe(() => {
                  this._serviceQueryTools.actualizacionCharlas();
                  this._router.navigate(['/mischarlastech']);
                });
            });
        }
      });
    }
  }
}

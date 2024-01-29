import { Component, OnInit } from '@angular/core';
import { CharlasPendientes } from 'src/app/models/CharlasPendientesTechRiders';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-charlas-tech-riders',
  templateUrl: './charlas-tech-riders.component.html',
  styleUrls: ['./charlas-tech-riders.component.css'],
})
export class CharlasTechRidersComponent implements OnInit {
  public charlasCargadas: boolean = false;
  charlas: CharlasPendientes[] = [];

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    this._service.charlasPorVerTechRiders().subscribe((response) => {
      this.charlas = response;
      this.charlasCargadas = true;
    });
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
          this._service
            .asignarseUnaCharlaTechRider(idUsuario, idcharla)
            .subscribe((response) => {
              this._service.updateEstadoCharla(idcharla, 3).subscribe(() => {
                this._router.navigate(['/mischarlastech']);
              });
            });
        }
      });
    }
  }
}

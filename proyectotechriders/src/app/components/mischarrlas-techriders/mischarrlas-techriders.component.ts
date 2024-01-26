import { Component, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { DetallesEstadoCharlaTech } from 'src/app/models/DetallesEstadoCharlaTechRiders';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mischarrlas-techriders',
  templateUrl: './mischarrlas-techriders.component.html',
  styleUrls: ['./mischarrlas-techriders.component.css'],
})
export class MischarrlasTechridersComponent implements OnInit {
  public charlasCargadas: boolean = false;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  charlas: DetallesEstadoCharlaTech[] = [];

  ngOnInit(): void {
    this._service.estadoCharlasTechRiders().subscribe((response) => {
      this.charlas = response;
      this.charlasCargadas = true;
      console.log('hola: ' + response);
    });
  }

  anularCharla(idcharla: number) {
    this._service
      .asignarseUnaCharlaTechRider(0, idcharla)
      .subscribe((response) => {
        this._router
          .navigate(['/usuario/perfil'], { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/mischarlastech']);
          });
      });
  }

  acreditarCharla(idcharla: number) {
    this._service
      .modificarEstadodeUnaCharlaTechRider(idcharla, 6)
      .subscribe((response) => {
        this._router
          .navigate(['/usuario/perfil'], { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['/mischarlastech']);
          });
      });
  }
}

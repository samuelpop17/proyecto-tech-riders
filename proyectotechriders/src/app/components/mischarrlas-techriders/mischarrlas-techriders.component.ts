import { Component, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { DetallesEstadoCharlaTech } from 'src/app/models/DetallesEstadoCharlaTechRiders';
@Component({
  selector: 'app-mischarrlas-techriders',
  templateUrl: './mischarrlas-techriders.component.html',
  styleUrls: ['./mischarrlas-techriders.component.css'],
})
export class MischarrlasTechridersComponent implements OnInit {
  constructor(private _service: ServicePrincipal) {}

  charlas: DetallesEstadoCharlaTech[] = [];

  ngOnInit(): void {
    this._service.estadoCharlasTechRiders().subscribe((response) => {
      this.charlas = response;
      console.log('hola: ' + response);
    });
  }
}

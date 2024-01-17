import { Component, OnInit } from '@angular/core';
import { CharlasPendientes } from 'src/app/models/CharlasPendientesTechRiders';
import { ServicePrincipal } from 'src/app/services/service.principal';
@Component({
  selector: 'app-charlas-tech-riders',
  templateUrl: './charlas-tech-riders.component.html',
  styleUrls: ['./charlas-tech-riders.component.css'],
})
export class CharlasTechRidersComponent implements OnInit {
  constructor(private _service: ServicePrincipal) {}

  charlas: CharlasPendientes[] = [];

  ngOnInit(): void {
    this._service.charlasPorVerTechRiders().subscribe((response) => {
      this.charlas = response;
      console.log('hola: ' + response);
    });
  }
}

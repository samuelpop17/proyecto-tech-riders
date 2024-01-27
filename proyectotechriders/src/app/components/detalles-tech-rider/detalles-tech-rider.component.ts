import { Component, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-detalles-tech-rider',
  templateUrl: './detalles-tech-rider.component.html',
  styleUrls: ['./detalles-tech-rider.component.css'],
})
export class DetallesTechRiderComponent implements OnInit {
  public techrider!: any;
  public tecnologias!: any[];

  constructor(
    private _service: ServicePrincipal,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      if (params['id']) {
        let idTechRider = params['id'];
        this._service.getTechRiders().subscribe((response: any[]) => {
          this.techrider = response.filter((tr) => tr.id == idTechRider)[0];
          this._service
            .findTecnologiasTechRider(this.techrider.idTechRider)
            .subscribe((response) => {
              this.tecnologias = response;
            });
        });
      }
    });
  }
}

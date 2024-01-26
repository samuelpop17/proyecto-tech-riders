import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TecnologiaCharla } from 'src/app/models/TecnologiaCharla';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-detallescharla',
  templateUrl: './detallescharla.component.html',
  styleUrls: ['./detallescharla.component.css'],
})
export class DetallescharlaComponent implements OnInit {
  public charla!: any;
  public tecnologias: string[] = [];
  public tecnologiasCargadas: boolean = false;

  constructor(
    private _service: ServicePrincipal,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((params: Params) => {
      if (params['idcharla']) {
        let idcharla = parseInt(params['idcharla']);
        this._service.findCharlaView(idcharla).subscribe((response) => {
          this.charla = response;
        });
        this._service.getTecnologiasCharla(idcharla).subscribe((response) => {
          this.tecnologiasCargadas = true;
          response.forEach((tecnologia: TecnologiaCharla) => {
            this.tecnologiasCargadas = false;
            this._service
              .findTecnologia(tecnologia.idTecnologia)
              .subscribe((response) => {
                this.tecnologias.push(response.nombreTecnologia);
                this.tecnologiasCargadas = true;
              });
          });
        });
      }
    });
  }
}

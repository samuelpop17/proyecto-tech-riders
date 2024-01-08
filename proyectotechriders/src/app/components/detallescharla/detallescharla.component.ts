import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-detallescharla',
  templateUrl: './detallescharla.component.html',
  styleUrls: ['./detallescharla.component.css'],
})
export class DetallescharlaComponent implements OnInit {
  public charla!: any;

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
      }
    });
  }
}

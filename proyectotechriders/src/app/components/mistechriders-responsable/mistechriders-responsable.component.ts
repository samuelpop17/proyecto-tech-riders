import { Component, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { TechRider } from 'src/app/models/techRider';
import { DetallesCharlas } from 'src/app/models/DetallesCharlas';
@Component({
  selector: 'app-mistechriders-responsable',
  templateUrl: './mistechriders-responsable.component.html',
  styleUrls: ['./mistechriders-responsable.component.css'],
})
export class MistechridersResponsableComponent implements OnInit {
  public usuarios: TechRider[] = [];
  public idempresa!: number;
  public charlas: DetallesCharlas[] = [];
  constructor(private _service: ServicePrincipal, private _router: Router) {}
  ngOnInit(): void {
    this._service.getPerfilUsuario().subscribe((response) => {
      this.idempresa = response;
      console.log('el id de empresa:' + response.idEmpresaCentro);

      this._service
        .getMisTechRidersResponsable(response.idEmpresaCentro)
        .subscribe((response) => {
          this.usuarios = response;
          console.log(response[1].nombre);
        });

      this._service
        .getCharlasTechResponsable(response.idEmpresaCentro)
        .subscribe((response) => {
          this.charlas = response;
          console.log('charlasdsadsad' + response);
        });
    });
  }
}

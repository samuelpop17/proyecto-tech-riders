import { Component, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { techRider } from 'src/app/models/techRider';
import { DetallesCharlas } from 'src/app/models/DetallesCharlas';
@Component({
  selector: 'app-mistechriders-responsable',
  templateUrl: './mistechriders-responsable.component.html',
  styleUrls: ['./mistechriders-responsable.component.css'],
})
export class MistechridersResponsableComponent implements OnInit {
  public usuarios: techRider[] = [];
  public idempresa!: number;
  public usuariosCargados: boolean = false;

  constructor(private _service: ServicePrincipal, private _router: Router) {}
  ngOnInit(): void {
    this._service.getdatosusuarioparaidempresa().subscribe((response) => {
      this.idempresa = response;
      console.log('el id de empresa:' + response.idEmpresaCentro);

      this._service
        .getMisTechRidersResponsable(response.idEmpresaCentro)
        .subscribe((response) => {
          this.usuarios = response;
          this.usuariosCargados = true;
          console.log(response[1].nombre);
        });
    });
  }
}

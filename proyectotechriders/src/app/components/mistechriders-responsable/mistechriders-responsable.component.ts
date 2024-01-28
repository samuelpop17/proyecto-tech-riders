import { Component, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { TechRider } from 'src/app/models/techRider';
import { DetallesCharlas } from 'src/app/models/DetallesCharlas';

@Component({
  selector: 'app-mistechriders-responsable',
  templateUrl: './mistechriders-responsable.component.html',
  styleUrls: ['./mistechriders-responsable.component.css'],
})
export class MistechridersResponsableComponent implements OnInit {
  public usuarios: TechRider[] = [];
  public charlas: DetallesCharlas[] = [];
  public charlasCargadas: boolean = false;
  public usuariosCargados: boolean = false;

  constructor(private _service: ServicePrincipal) {}

  ngOnInit(): void {
    this._service.getPerfilUsuario().subscribe((response) => {
      this._service
        .getMisTechRidersResponsable(response.idEmpresaCentro)
        .subscribe((response) => {
          this.usuariosCargados = true;
          this.usuarios = response;
        });

      this._service
        .getCharlasTechResponsable(response.idEmpresaCentro)
        .subscribe((response) => {
          this.charlasCargadas = true;
          this.charlas = response;
        });
    });
  }
}

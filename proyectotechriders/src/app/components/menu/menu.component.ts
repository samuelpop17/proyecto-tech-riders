import { Component, DoCheck } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements DoCheck {
  public role!: number | null;
  public tipoEmpresaCentro!: number;

  constructor(private _service: ServicePrincipal) {}

  ngDoCheck(): void {
    if (this.role != localStorage.getItem('role')) {
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      if (localStorage.getItem('token')) {
        this._service.getPerfilUsuario().subscribe((response) => {
          let usuario = response;
          if (usuario.idEmpresaCentro) {
            this._service
              .findEmpresaCentro(usuario.idEmpresaCentro)
              .subscribe((response) => {
                this.tipoEmpresaCentro = response.idTipoEmpresa;
              });
          }
        });
      }
    }
  }
}

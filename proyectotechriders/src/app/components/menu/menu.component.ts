import { Component, DoCheck } from '@angular/core';
import { EmpresaCentro } from 'src/app/models/EmpresaCentro';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements DoCheck {
  public role!: number | null;
  public estadoEmpresa: number = 1;

  constructor(private _service: ServicePrincipal) {}

  ngDoCheck(): void {
    if (this.role != localStorage.getItem('role')) {
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      if (this.role == 4) {
        this._service.getPerfilUsuario().subscribe((response) => {
          if (response.idEmpresaCentro) {
            this._service
              .findEmpresaCentro(response.idEmpresaCentro)
              .subscribe((response) => {
                this.estadoEmpresa = response.estadoEmpresa;
              });
          }
        });
      }
    }
  }
}

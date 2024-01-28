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
  public token!: string | null;
  public estadoEmpresa: number = 0;
  public countPeticiones: boolean = false;

  constructor(private _service: ServicePrincipal) {}

  ngDoCheck(): void {
    if (
      parseInt(localStorage.getItem('idUsuario') ?? '0') != 0 &&
      this.token != localStorage.getItem('token')
    ) {
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      this.token = localStorage.getItem('token');
      if (this.role == 4) {
        this._service.getPerfilUsuario().subscribe((response) => {
          if (response.idEmpresaCentro) {
            this._service
              .findEmpresaCentro(response.idEmpresaCentro)
              .subscribe((response) => {
                this.estadoEmpresa = response.estadoEmpresa;
              });
          } else this.estadoEmpresa = 0;
        });
      } else if (this.role == 1) {
        this._service.getAllPeticiones().subscribe((response: any[]) => {
          response.length > 0
            ? (this.countPeticiones = true)
            : (this.countPeticiones = false);
        });
      }
    }
  }
}

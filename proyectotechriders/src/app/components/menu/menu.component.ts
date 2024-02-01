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
  public numPeticiones: number = 0;
  public numCharlas: number = 0;

  constructor(private _service: ServicePrincipal) {}

  ngDoCheck(): void {
    if (
      (parseInt(localStorage.getItem('role') ?? '0') != 0 &&
        (this.role != localStorage.getItem('role') ||
          this.token != localStorage.getItem('token'))) ||
      (this.role != 0 && parseInt(localStorage.getItem('role') ?? '0') == 0)
    ) {
      console.log('CUIDAO');
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      this.token = localStorage.getItem('token');
      if (this.role == 3 || this.role == 4) {
        this._service.actualizacionCharlas();
        this._service.numCharlas$.subscribe((data) => {
          this.numCharlas = data;
        });
      }
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
        this._service.actualizacionPeticiones();
        this._service.numPeticiones$.subscribe((data) => {
          this.numPeticiones = data;
        });
      }
    }
  }
}

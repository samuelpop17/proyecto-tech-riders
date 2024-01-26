import { Component, DoCheck, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/Provincia';
import { EmpresaCentro } from 'src/app/models/EmpresaCentro';
import { Role } from 'src/app/models/Role';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css'],
})
export class PerfilusuarioComponent implements OnInit {
  public usuario!: Usuario;
  public provincia!: Provincia;
  public empresaCentro!: EmpresaCentro;
  public role!: Role;
  public tecnologias!: any[];
  public cursos!: any[];
  public empresaExists: boolean = false;
  public empresaLoaded: boolean = false;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._service.getPerfilUsuario().subscribe((response) => {
        this.usuario = response;
        this._service
          .findProvincia(this.usuario.idProvincia)
          .subscribe((response) => {
            this.provincia = response;
          });
        if (this.usuario.idEmpresaCentro) {
          this.empresaExists = true;
          this._service
            .findEmpresaCentro(this.usuario.idEmpresaCentro)
            .subscribe((response) => {
              this.empresaLoaded = true;
              this.empresaCentro = response;
            });
        }
        this._service.findRole(this.usuario.idRole).subscribe((response) => {
          this.role = response;
        });

        if (this.usuario.idRole >= 3) {
          // TechRider
          this._service
            .findTecnologiasTechRider(this.usuario.idUsuario)
            .subscribe((response) => {
              this.tecnologias = response;
            });
        }

        if (this.usuario.idRole == 2) {
          // Profesor
          this._service
            .findCursosProfesor(this.usuario.idUsuario)
            .subscribe((response) => {
              this.cursos = response;
            });
        }
      });
    } else this._router.navigate(['/login']);
  }
}

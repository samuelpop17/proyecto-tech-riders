import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/Provincia';
import { Usuario } from 'src/app/models/Usuario';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css'],
})
export class EditarusuarioComponent implements OnInit {
  public usuario!: Usuario;
  public provincias!: Provincia[];

  @ViewChild('controlnombre') controlnombre!: ElementRef;
  @ViewChild('controlapellidos') controlapellidos!: ElementRef;
  @ViewChild('controltelefono') controltelefono!: ElementRef;
  @ViewChild('controllinkedin') controllinkedin!: ElementRef;
  @ViewChild('selectprovincia') selectprovincia!: ElementRef;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    this.getPerfilUsuario();
  }

  getPerfilUsuario(): void {
    let token = localStorage.getItem('token') ?? '0';
    if (token) {
      let id: number = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._service.findUsuario(id).subscribe((response) => {
        this.usuario = response;
        this._service.getProvincias().subscribe((response) => {
          this.provincias = response;
        });
      });
    } else this._router.navigate(['/']);
  }

  editarPerfil(): void {
    let usuario: Usuario = {
      idUsuario: this.usuario.idUsuario,
      nombre: this.controlnombre.nativeElement.value,
      apellidos: this.controlapellidos.nativeElement.value,
      email: this.usuario.email,
      telefono: this.controltelefono.nativeElement.value,
      linkedIn: this.controllinkedin.nativeElement.value,
      password: this.usuario.password,
      idRole: this.usuario.idRole,
      idProvincia: this.selectprovincia.nativeElement.selectedOptions[0].value,
      idEmpresaCentro: this.usuario.idEmpresaCentro,
      estado: this.usuario.estado,
    };
    this._service.editUsuario(usuario).subscribe((response) => {
      this._service.findUsuario(usuario.idUsuario).subscribe((response) => {
        console.log(response);
      });
      this._router.navigate(['/perfil']);
    });
  }
}

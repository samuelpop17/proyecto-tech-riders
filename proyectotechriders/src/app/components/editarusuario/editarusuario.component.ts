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

  @ViewChild('controlnombre') controlNombre!: ElementRef;
  @ViewChild('controlapellidos') controlApellidos!: ElementRef;
  @ViewChild('controlemail') controlEmail!: ElementRef;
  @ViewChild('controltelefono') controlTelefono!: ElementRef;
  @ViewChild('controllinkedin') controlLinkedin!: ElementRef;
  @ViewChild('selectprovincia') selectProvincia!: ElementRef;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._service.getPerfilUsuario().subscribe((response) => {
        this.usuario = response;
        this._service.getProvincias().subscribe((response) => {
          this.provincias = response;
        });
      });
    } else this._router.navigate(['/login']);
  }

  editarPerfil(): void {
    let usuario: Usuario = {
      idUsuario: this.usuario.idUsuario,
      nombre: this.controlNombre.nativeElement.value,
      apellidos: this.controlApellidos.nativeElement.value,
      email: this.controlEmail.nativeElement.value,
      telefono: this.controlTelefono.nativeElement.value,
      linkedIn: this.controlLinkedin.nativeElement.value,
      password: this.usuario.password,
      idRole: this.usuario.idRole,
      idProvincia: this.selectProvincia.nativeElement.selectedOptions[0].value,
      idEmpresaCentro: this.usuario.idEmpresaCentro,
      estado: this.usuario.estado,
    };
    this._service.editUsuario(usuario).subscribe((response) => {
      this._service.findUsuario(usuario.idUsuario).subscribe((response) => {
        console.log(response);
      });
      this._router.navigate(['/usuario/perfil']);
    });
  }
}

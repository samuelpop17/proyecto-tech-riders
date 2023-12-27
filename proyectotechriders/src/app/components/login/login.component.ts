import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('controlemail') controlEmail!: ElementRef;
  @ViewChild('controlpassword') controlPassword!: ElementRef;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) this._router.navigate(['/perfil']);
  }

  iniciarSesion(): void {
    let email = this.controlEmail.nativeElement.value;
    let password = this.controlPassword.nativeElement.value;
    this._service.loginUser(email, password).subscribe((response) => {
      localStorage.setItem('token', response.response);
      this._service.getPerfilUsuario().subscribe((response) => {
        if (response.estado == 1) {
          localStorage.setItem('idUsuario', response.idUsuario);
          localStorage.setItem('role', response.idRole);
          this._router.navigate(['/perfil']);
        } else {
          localStorage.removeItem('token');
          alert('Usuario no dado de alta por el administrador');
          this._router.navigate(['/login']);
        }
      });
    });
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    if (localStorage.getItem('token'))
      this._router.navigate(['/usuario/perfil']);
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
          if (response.idRole == 1) {
            this._router.navigate(['/usuario/perfil']); //cambiar a admin panel
          } else this._router.navigate(['/usuario/perfil']);
        } else {
          localStorage.removeItem('token');
          Swal.fire({
            color: '#333333',
            confirmButtonColor: '#212529',
            confirmButtonText: 'Cerrar',
            icon: 'error',
            text: 'Usuario no dado de alta por el administrador',
            title: 'Error',
          });
        }
      });
    });
  }
}

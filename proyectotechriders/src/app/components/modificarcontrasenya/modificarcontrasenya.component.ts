import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-modificarcontrasenya',
  templateUrl: './modificarcontrasenya.component.html',
  styleUrls: ['./modificarcontrasenya.component.css'],
})
export class ModificarcontrasenyaComponent implements OnInit {
  @ViewChild('controlantigua') controlAntigua!: ElementRef;
  @ViewChild('controlnueva') controlNueva!: ElementRef;
  @ViewChild('controlrepetir') controlRepetir!: ElementRef;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);
  }

  updatePassword(): void {
    let antigua = this.controlAntigua.nativeElement.value;
    let nueva = this.controlNueva.nativeElement.value;
    let repetir = this.controlRepetir.nativeElement.value;
    this._service.getPerfilUsuario().subscribe((response) => {
      if (response.password != antigua) {
        alert('Contraseña antigua errónea');
        return;
      } else if (nueva != repetir) {
        alert('Las dos contraseñas nuevas no son iguales');
        return;
      } else if (response.password == nueva) {
        alert('La contraseña nueva es igual a la antigua');
        return;
      }
      this._service
        .updatePasswordUsuario(response.idUsuario, nueva)
        .subscribe((response) => {
          this._router.navigate(['/perfil']);
        });
    });
  }
}

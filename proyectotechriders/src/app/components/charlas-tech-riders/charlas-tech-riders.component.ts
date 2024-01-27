import { Component, OnInit } from '@angular/core';
import { CharlasPendientes } from 'src/app/models/CharlasPendientesTechRiders';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charlas-tech-riders',
  templateUrl: './charlas-tech-riders.component.html',
  styleUrls: ['./charlas-tech-riders.component.css'],
})
export class CharlasTechRidersComponent implements OnInit {
  public charlasCargadas: boolean = false;
  charlas: CharlasPendientes[] = [];

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    this._service.charlasPorVerTechRiders().subscribe((response) => {
      this.charlas = response;
      this.charlasCargadas = true;
      console.log('hola: ' + response);
    });
  }

  asignarCharla(idcharla: number) {
    // Obtener idUsuario del localStorage
    var idusuario = localStorage.getItem('idUsuario');

    // Verificar si idUsuario existe
    if (idusuario) {
      // Convertir idUsuario a número si es necesario
      const idUsuarioNum = +idusuario;

      // Llamar al servicio para asignar charla
      this._service
        .asignarseUnaCharlaTechRider(idUsuarioNum, idcharla)
        .subscribe((response) => {
          // Llamar al servicio para modificar el estado de la charla
          this._service.updateEstadoCharla(idcharla, 3).subscribe(() => {
            // Redirigir a la página mischarlastech
            this._router.navigate(['/mischarlastech']);
          });
        });
    } else {
      console.error('Error: idUsuario no encontrado en el localStorage');
      // Aquí puedes manejar el error como consideres apropiado
    }
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { SolicitudAcreditacionCharla } from 'src/app/models/SolicitudAcreditacionCharla';

@Component({
  selector: 'app-acreditarcharla',
  templateUrl: './acreditarcharla.component.html',
  styleUrls: ['./acreditarcharla.component.css'],
})
export class AcreditarcharlaComponent implements OnInit {
  public peticionesCharlas!: SolicitudAcreditacionCharla[];
  public charlas: any[] = [];
  public role!: number | null;
  public acreditacionesCargadas: boolean = false;

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) this.cargarDatos();
  }

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  cambiarEstado(idCharla: number, idPeticion: number) {
    this._service.updateEstadoCharla(idCharla, 6).subscribe((response) => {
      this.eliminarAcreditacion(idPeticion);
    });
  }

  eliminarAcreditacion(idPeticion: number) {
    this._service
      .solicitudAcreditacionEliminar(idPeticion)
      .subscribe((response) => {
        this.cargarDatos();
      });
  }

  cargarDatos() {
    this.acreditacionesCargadas = false;
    this.charlas = [];
    this._service.getAcreditacionesCharlas().subscribe((response) => {
      this.peticionesCharlas = response;
      this._service.getCharlas().subscribe((response) => {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < this.peticionesCharlas.length; j++) {
            if (this.peticionesCharlas[j].idCharla == response[i].idCharla) {
              this.charlas.push({
                idCharla: response[i].idCharla,
                descripcion: response[i].descripcion,
                fechaCharla: response[i].fechaCharla,
                fechaSolicitud: response[i].fechaSolicitud,
                modalidad: response[i].modalidad,
                turno: response[i].turno,
                idPeticion: this.peticionesCharlas[j].idPeticionCharla,
              });
              break;
            }
          }
        }
        this.acreditacionesCargadas = true;
      });
    });
  }
}

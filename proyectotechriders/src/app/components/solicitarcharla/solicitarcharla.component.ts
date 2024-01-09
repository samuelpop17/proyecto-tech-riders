import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Charla } from 'src/app/models/Charla';
import { Curso } from 'src/app/models/Curso';
import { Provincia } from 'src/app/models/Provincia';
import { Tecnologia } from 'src/app/models/Tecnologia';
import { ServicePrincipal } from 'src/app/services/service.principal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitarcharla',
  templateUrl: './solicitarcharla.component.html',
  styleUrls: ['./solicitarcharla.component.css'],
})
export class SolicitarcharlaComponent implements OnInit {
  public tecnologias!: Tecnologia[];
  public cursos!: Curso[];
  public provincias!: Provincia[];

  @ViewChild('selecttecnologias') selectTecnologias!: ElementRef;
  @ViewChild('controldescripcion') controlDescripcion!: ElementRef;
  @ViewChild('controlfecha') controlFecha!: ElementRef;
  @ViewChild('selectcurso') selectCurso!: ElementRef;
  @ViewChild('selectturno') selectTurno!: ElementRef;
  @ViewChild('selectmodalidad') selectModalidad!: ElementRef;
  @ViewChild('selectprovincia') selectProvincia!: ElementRef;
  @ViewChild('controlobservaciones') controlObservaciones!: ElementRef;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._service.getTecnologias().subscribe((response) => {
        this.tecnologias = response;
      });
      let id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._service.findCursosProfesor(id).subscribe((response) => {
        this.cursos = response;
      });
      this._service.getProvincias().subscribe((response) => {
        this.provincias = response;
      });
    } else this._router.navigate(['/login']);
  }

  solicitarCharla(): void {
    if (this.selectTecnologias.nativeElement.selectedOptions.length == 0) {
      Swal.fire({
        color: '#333333',
        confirmButtonColor: '#212529',
        confirmButtonText: 'Cerrar',
        icon: 'error',
        text: 'Elige al menos una tecnología',
        title: 'Error',
      });
    } else {
      let fechaCharla = null;
      if (this.controlFecha.nativeElement.value != '')
        fechaCharla = this.controlFecha.nativeElement.value;
      let charla: Charla = {
        idCharla: 1,
        descripcion: this.controlDescripcion.nativeElement.value,
        idEstadoCharla: 2, // PENDIENTE,
        fechaCharla: fechaCharla,
        observaciones: this.controlObservaciones.nativeElement.value,
        idTechRider: undefined,
        fechaSolicitud: Date.now.toString(),
        turno: this.selectTurno.nativeElement.selectedOptions[0].value,
        modalidad: this.selectModalidad.nativeElement.selectedOptions[0].value,
        acreditacionLinkedIn: undefined,
        idCurso: this.selectCurso.nativeElement.selectedOptions[0].value,
        idProvincia:
          this.selectProvincia.nativeElement.selectedOptions[0].value,
      };
      /*
      this._service.createCharla(charla).subscribe((response) => {
        this._router.navigate(['/charlas/mis-charlas']);
      });
      */
    }
  }
}

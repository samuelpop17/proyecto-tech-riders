import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Charla } from 'src/app/models/Charla';
import { Curso } from 'src/app/models/Curso';
import { Provincia } from 'src/app/models/Provincia';
import { Tecnologia } from 'src/app/models/Tecnologia';
import { ServiceCharlas } from 'src/app/services/service.charlas';
import { ServiceProvincias } from 'src/app/services/service.provincias';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import { ServiceTecnologias } from 'src/app/services/service.tecnologias';
import { ServiceTecnologiasCharlas } from 'src/app/services/service.tecnologiascharlas';
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
  public role!: number | null;

  @ViewChild('selecttecnologias') selectTecnologias!: ElementRef;
  @ViewChild('controldescripcion') controlDescripcion!: ElementRef;
  @ViewChild('controlfecha') controlFecha!: ElementRef;
  @ViewChild('selectcurso') selectCurso!: ElementRef;
  @ViewChild('selectturno') selectTurno!: ElementRef;
  @ViewChild('selectmodalidad') selectModalidad!: ElementRef;
  @ViewChild('selectprovincia') selectProvincia!: ElementRef;
  @ViewChild('controlobservaciones') controlObservaciones!: ElementRef;

  constructor(
    private _serviceTecnologias: ServiceTecnologias,
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceProvincias: ServiceProvincias,
    private _serviceCharlas: ServiceCharlas,
    private _serviceTecnologiasCharlas: ServiceTecnologiasCharlas,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 2) {
      this._serviceTecnologias.getTecnologias().subscribe((response) => {
        this.tecnologias = response;
      });
      let id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._serviceQueryTools.findCursosProfesor(id).subscribe((response) => {
        this.cursos = response;
      });
      this._serviceProvincias.getProvincias().subscribe((response) => {
        this.provincias = response;
      });
    } else this._router.navigate(['/usuario/perfil']);
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
      let fechaSolicitud = new Date().toISOString();
      let modalidad = this.selectModalidad.nativeElement.value;
      if (modalidad == 'SIN DEFINIR') modalidad = null;
      let charla: Charla = {
        idCharla: 1,
        descripcion: this.controlDescripcion.nativeElement.value,
        idEstadoCharla: 2, // PENDIENTE
        fechaCharla: fechaCharla,
        observaciones: this.controlObservaciones.nativeElement.value,
        idTechRider: null,
        fechaSolicitud: fechaSolicitud,
        turno: this.selectTurno.nativeElement.selectedOptions[0].value,
        modalidad: modalidad,
        acreditacionLinkedIn: null,
        idCurso: this.selectCurso.nativeElement.selectedOptions[0].value,
        idProvincia:
          this.selectProvincia.nativeElement.selectedOptions[0].value,
      };
      this._serviceCharlas.getCharlas().subscribe((response) => {
        let charlas = response;
        let fecha = new Date(charla.fechaCharla);
        charlas = charlas.filter((chrl: Charla) => {
          let otraFecha = new Date(chrl.fechaCharla);
          if (otraFecha.getMonth() >= 0 && otraFecha.getMonth() <= 7) {
            var principio = new Date(otraFecha.getFullYear() - 1, 8, 1);
            var final = new Date(otraFecha.getFullYear(), 7, 31);
          } else {
            var principio = new Date(otraFecha.getFullYear(), 8, 1);
            var final = new Date(otraFecha.getFullYear() + 1, 7, 31);
          }
          console.log(principio);
          console.log(final);
          return (
            chrl.idCurso == charla.idCurso &&
            fecha >= principio &&
            fecha <= final
          );
        });
        if (charlas.length == 0) {
          this._serviceCharlas.createCharla(charla).subscribe((response) => {
            let idCharla = response.idCharla;
            let tecnologias =
              this.selectTecnologias.nativeElement.selectedOptions;
            for (let i = 0; i < tecnologias.length; i++) {
              this._serviceTecnologiasCharlas
                .createTecnologiaCharla(idCharla, tecnologias[i].value)
                .subscribe((response) => {});
            }
            this._serviceQueryTools.actualizacionCharlas();
            this._router.navigate(['/charlas/mis-charlas']);
          });
        } else {
          Swal.fire({
            color: '#333333',
            confirmButtonColor: '#212529',
            confirmButtonText: 'Cerrar',
            icon: 'error',
            text: 'Existe ya una charla para este curso solicitada en el curso escolar marcado',
            title: 'Error',
          });
        }
      });
    }
  }
}

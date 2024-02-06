import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoCharla } from 'src/app/models/EstadoCharla';
import { ServiceCharlas } from 'src/app/services/service.charlas';
import { ServiceEstadosCharlas } from 'src/app/services/service.estadoscharlas';
import { ServiceQueryTools } from 'src/app/services/service.querytools';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-charlasprofesor',
  templateUrl: './charlasprofesor.component.html',
  styleUrls: ['./charlasprofesor.component.css'],
})
export class CharlasprofesorComponent implements OnInit {
  public charlas!: any[];
  public charlasFiltradas!: any[];
  public estados!: EstadoCharla[];
  public charlasCargadas: boolean = false;
  private cursos!: any[];
  public role!: number | null;

  @ViewChild('selectestado') selectEstado!: ElementRef;

  constructor(
    private _serviceQueryTools: ServiceQueryTools,
    private _serviceEstadosCharlas: ServiceEstadosCharlas,
    private _serviceCharlas: ServiceCharlas,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) this._router.navigate(['/login']);

    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 2) {
      let id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._serviceQueryTools.getCharlasView().subscribe((response) => {
        this.charlas = response;
        this._serviceQueryTools.findCursosProfesor(id).subscribe((response) => {
          this.cursos = response;
          this.cursos = this.cursos.map((curso) => curso.idCurso);
          this.charlas = this.charlas.filter((charla) =>
            this.cursos.includes(charla.idCurso)
          );
          this.charlasFiltradas = this.charlas;
          this.charlasCargadas = true;
        });
      });
      this._serviceEstadosCharlas.getEstadosCharlas().subscribe((response) => {
        this.estados = response;
      });
    } else this._router.navigate(['/usuario/perfil']);
  }

  filtrarCharlas(): void {
    let estado = this.selectEstado.nativeElement.selectedOptions[0].value;
    if (estado == 0) this.charlasFiltradas = this.charlas;
    else {
      this.charlasFiltradas = this.charlas.filter(
        (charla) => charla.idEstadoCharla == estado
      );
    }
  }

  recargarCharlas(): void {
    this.charlasCargadas = false;
    this._serviceQueryTools.getCharlasView().subscribe((response) => {
      this.charlas = response;
      this.charlas = this.charlas.filter((charla) =>
        this.cursos.includes(charla.idCurso)
      );
      this.charlasFiltradas = this.charlas;
      this.charlasCargadas = true;
    });
  }

  cancelarCharla(idCharla: number): void {
    Swal.fire({
      cancelButtonText: 'No',
      color: '#333333',
      confirmButtonColor: '#212529',
      confirmButtonText: 'Si, cancelar',
      icon: 'question',
      showCancelButton: true,
      text: 'No podrás revertir esta acción',
      title: '¿Quieres cancelar esta charla?',
    }).then((result) => {
      if (result.isConfirmed) {
        // ESTADO CANCELADA: ID 1
        this._serviceCharlas
          .updateEstadoCharla(idCharla, 1)
          .subscribe((response) => {
            Swal.fire({
              color: '#333333',
              icon: 'success',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              title: 'Charla cancelada',
            });
            this.recargarCharlas();
          });
      }
    });
  }

  completarCharla(idCharla: number): void {
    Swal.fire({
      cancelButtonText: 'No',
      color: '#333333',
      confirmButtonColor: '#212529',
      confirmButtonText: 'Si, completar',
      icon: 'question',
      showCancelButton: true,
      text: 'Esto significa que el Tech Rider ya ha realizado esta charla',
      title: '¿Quieres completar esta charla?',
    }).then((result) => {
      if (result.isConfirmed) {
        // ESTADO COMPLETADA: ID 5
        this._serviceCharlas
          .updateEstadoCharla(idCharla, 5)
          .subscribe((response) => {
            Swal.fire({
              color: '#333333',
              icon: 'success',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
              title: 'Charla completada',
            });
            this.recargarCharlas();
          });
      }
    });
  }
}

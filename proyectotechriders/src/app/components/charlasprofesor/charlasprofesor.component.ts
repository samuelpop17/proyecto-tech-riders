import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoCharla } from 'src/app/models/EstadoCharla';
import { ServicePrincipal } from 'src/app/services/service.principal';
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

  @ViewChild('selectestado') selectEstado!: ElementRef;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      let id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._service.getCharlasView().subscribe((response) => {
        this.charlas = response;
        this._service.findCursosProfesor(id).subscribe((response) => {
          this.cursos = response;
          this.cursos = this.cursos.map((curso) => curso.idCurso);
          this.charlas = this.charlas.filter((charla) =>
            this.cursos.includes(charla.idCurso)
          );
          this.charlasFiltradas = this.charlas;
          this.charlasCargadas = true;
        });
      });
      this._service.getEstadosCharlas().subscribe((response) => {
        this.estados = response;
      });
    } else this._router.navigate(['/login']);
  }

  filtrarCharlas(): void {
    let estado = this.selectEstado.nativeElement.selectedOptions[0].value;
    this.charlasFiltradas = this.charlas.filter(
      (charla) => charla.idEstadoCharla == estado
    );
  }

  reiniciarFiltro(): void {
    this.charlasFiltradas = this.charlas;
  }

  recargarCharlas(): void {
    this.charlasCargadas = false;
    this._service.getCharlasView().subscribe((response) => {
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
      confirmButtonText: 'Si',
      icon: 'question',
      showCancelButton: true,
      text: 'No podrás revertir la cancelación',
      title: '¿Quieres cancelar esta charla?',
    }).then((result) => {
      if (result.isConfirmed) {
        // ESTADO CANCELADA: ID 1
        this._service.updateEstadoCharla(idCharla, 1).subscribe((response) => {
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
}

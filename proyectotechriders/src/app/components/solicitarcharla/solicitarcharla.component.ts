import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { Tecnologia } from 'src/app/models/Tecnologia';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-solicitarcharla',
  templateUrl: './solicitarcharla.component.html',
  styleUrls: ['./solicitarcharla.component.css'],
})
export class SolicitarcharlaComponent implements OnInit {
  public tecnologias!: Tecnologia[];
  public cursos!: Curso[];

  @ViewChild('selecttecnologias') selectTecnologias!: ElementRef;
  @ViewChild('selectturno') selectTurno!: ElementRef;
  @ViewChild('selectmodalidad') selectModalidad!: ElementRef;

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
    } else this._router.navigate(['/login']);
  }

  solicitarCharla(): void {}
}

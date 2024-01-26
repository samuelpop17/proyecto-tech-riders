import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css'],
})
export class ListadosComponent implements OnInit {
  public charlas!: any[];
  public charlasFiltro!: any[];
  public charlasFiltroTema!: any[]; //meter desde consulta
  public charlasFiltroTr!: any[]; //meter desde consulta
  @ViewChild('selectTr') selectTr!: ElementRef;
  @ViewChild('selectema') selectema!: ElementRef;
  public tema!: any;
  public tr!: any;
  public filter_array!: any;
  public role!: number | null;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    this.listaGeneral();
    if (this.role != localStorage.getItem('role'))
      this.role = parseInt(localStorage.getItem('role') ?? '0');
  }
  listaGeneral(): void {
    this._service.getCharlasView().subscribe((response: any) => {
      this.charlas = response;
      this.charlasFiltro = response;
      this.charlasFiltroTema = response;
      this.charlasFiltroTr = response;
      this.charlasFiltroTema = this.charlasFiltroTema.filter(
        (valor, indice, self) =>
          indice ===
          self.findIndex((v) => v.descripcionCharla === valor.descripcionCharla)
      );
      this.charlasFiltroTr = this.charlasFiltroTr.filter(
        (valor, indice, self) =>
          indice === self.findIndex((v) => v.techRider === valor.techRider)
      );
    });
  }

  filtrarTabla() {
    this.charlas = this.charlasFiltro;
    let i = 0;
    this.tema = this.selectema.nativeElement.value;
    this.tr = this.selectTr.nativeElement.value;
    this.filter_array = [];

    if (this.tema == 'todo' && this.tr == 'todo') {
      this.listaGeneral();
    } else if (this.tr == 'todo' && this.tema != 'todo') {
      this.filter_array = this.charlas.filter(
        (x) => x.descripcionCharla === this.tema
      );
    } else if (this.tr != 'todo' && this.tema == 'todo') {
      this.filter_array = this.charlas.filter((x) => x.techRider === this.tr);
    } else {
      this.filter_array = this.charlas.filter(
        (x) => x.descripcionCharla === this.tema
      );
      this.filter_array = this.filter_array.filter(
        (x: { techRider: any }) => x.techRider === this.tr
      );
    }
    this.charlas = this.filter_array;
  }
}

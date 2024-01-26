import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listadotr',
  templateUrl: './listadotr.component.html',
  styleUrls: ['./listadotr.component.css'],
})
export class ListadotrComponent implements OnInit {
  public techriders!: any[];
  public trFiltro!: any[];
  public charlasFiltroEmpresa!: any[]; //meter desde consulta
  public charlasFiltroTr!: any[]; //meter desde consulta
  @ViewChild('selectTr') selectTr!: ElementRef;
  @ViewChild('selectempresa') selectempresa!: ElementRef;
  public empresa!: any;
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
    this._service.getTechRiders().subscribe((response: any) => {
      this.techriders = response;
      this.trFiltro = response;
      this.charlasFiltroEmpresa = response;
      this.charlasFiltroTr = response;
      this.charlasFiltroEmpresa = this.charlasFiltroEmpresa.filter(
        (valor, indice, self) =>
          indice === self.findIndex((v) => v.empresa === valor.empresa)
      );
      this.charlasFiltroTr = this.charlasFiltroTr.filter(
        (valor, indice, self) =>
          indice === self.findIndex((v) => v.techRider === valor.techRider)
      );
    });
  }

  filtrarTabla() {
    this.techriders = this.trFiltro;
    let i = 0;
    this.empresa = this.selectempresa.nativeElement.value;
    this.tr = this.selectTr.nativeElement.value;
    this.filter_array = [];

    if (this.empresa == 'todo' && this.tr == 'todo') {
      this.listaGeneral();
    } else if (this.tr == 'todo' && this.empresa != 'todo') {
      this.filter_array = this.techriders.filter(
        (x) => x.empresa === this.empresa
      );
    } else if (this.tr != 'todo' && this.empresa == 'todo') {
      this.filter_array = this.techriders.filter(
        (x) => x.techRider === this.tr
      );
    } else {
      this.filter_array = this.techriders.filter(
        (x) => x.empresa === this.empresa
      );
      this.filter_array = this.filter_array.filter(
        (x: { techRider: any }) => x.techRider === this.tr
      );
    }
    //console.log(this.filter_array);
    this.techriders = this.filter_array;
  }
}

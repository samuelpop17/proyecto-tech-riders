import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listadosempresa',
  templateUrl: './listadosempresa.component.html',
  styleUrls: ['./listadosempresa.component.css'],
})
export class ListadosempresaComponent implements OnInit {
  public empresas!: any[];
  public empresasReset: any[] = [];
  public proFiltro!: any[];
  public empresasFiltroNombre!: any[]; //meter desde consulta
  public provincias!: any[];
  @ViewChild('selectprovincia') selectprovincia!: ElementRef;
  @ViewChild('selectempresa') selectempresa!: ElementRef;
  public empresa!: any;
  public provincia!: any;
  public filter_array!: any;
  public role!: number | null;
  public empresasCargadas: boolean = false;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    this._service.getProvincias().subscribe((response: any) => {
      this.provincias = response;
      this._service.getEmpresasCentrosActivas().subscribe((response: any) => {
        this.empresas = response;

        this.empresas.forEach((centro) => {
          centro.provincia =
            this.provincias[centro.idProvincia - 1].nombreProvincia;
          if (centro.idTipoEmpresa == 1) this.empresasReset.push(centro);
        });

        this.proFiltro = this.empresasReset;
        this.empresasFiltroNombre = this.empresasReset;
        this.empresasFiltroNombre = this.empresasFiltroNombre.filter(
          (valor, indice, self) =>
            indice === self.findIndex((v) => v.nombre === valor.nombre)
        );

        this.empresasCargadas = true;
      });
    });
  }

  filtrarTabla() {
    this.empresasReset = this.proFiltro;
    let i = 0;
    this.empresa = this.selectempresa.nativeElement.selectedOptions[0].value;
    this.provincia = parseInt(
      this.selectprovincia.nativeElement.selectedOptions[0].value
    );
    this.filter_array = [];

    if (this.empresa == 'todo' && this.provincia == 0) {
      this.empresasReset = this.proFiltro;
      return;
    } else if (this.provincia == 0 && this.empresa != 'todo') {
      this.filter_array = this.empresasReset.filter(
        (x) => x.nombre === this.empresa
      );
    } else if (this.provincia != 0 && this.empresa == 'todo') {
      this.filter_array = this.empresasReset.filter(
        (x) => x.idProvincia === this.provincia
      );
    } else {
      this.filter_array = this.empresasReset.filter(
        (x) => x.nombre === this.empresa
      );
      this.filter_array = this.filter_array.filter(
        (x: { idProvincia: any }) => x.idProvincia === this.provincia
      );
    }
    this.empresasReset = this.filter_array;
  }
}

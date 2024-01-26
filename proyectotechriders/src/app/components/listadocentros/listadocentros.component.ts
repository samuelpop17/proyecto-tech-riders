import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listadocentros',
  templateUrl: './listadocentros.component.html',
  styleUrls: ['./listadocentros.component.css']
})
export class ListadocentrosComponent implements OnInit {

  public centros!: any[];
  public proFiltro!: any[];
  public charlasFiltroEmpresa!: any[];//meter desde consulta
  public charlasFiltroPro!: any[];//meter desde consulta
  @ViewChild('selectprovincia') selectprovincia!: ElementRef;
  @ViewChild('selectempresa') selectempresa!: ElementRef;
  public empresa!: any;
  public provincia!: any;
  public filter_array!: any;




  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    this.listaGeneral();
    //this.filter();
    //this.filtarTemas();
  }
  listaGeneral(): void {
    this._service.getEmpresasCentros().subscribe((response: any) => {
      this.centros = response;
      this.proFiltro = response;
      this.charlasFiltroEmpresa = response;
      this.charlasFiltroPro = response;
      this.charlasFiltroEmpresa = this.charlasFiltroEmpresa.filter((valor, indice, self)=>
      indice ===self.findIndex((v)=>(
        v.nombre === valor.nombre
      ))
      );

      this.charlasFiltroPro = this.charlasFiltroPro.filter((valor, indice, self)=>
      indice ===self.findIndex((v)=>(
        v.idProvincia === valor.idProvincia

      ))
      );
      });      

  }


  filtrarTabla() {
    this.centros = this.proFiltro;
    let i = 0;
    this.empresa = this.selectempresa.nativeElement.value;
    this.provincia = parseInt(this.selectprovincia.nativeElement.value);
    this.filter_array = [];

    if (this.empresa == 'todo' && this.provincia == 'todo') {
      this.listaGeneral();
    } else if (this.provincia == 'todo' && this.empresa != 'todo') {
      this.filter_array = this.centros.filter(
        (x) => x.nombre === this.empresa
      );
    } else if (this.provincia != 'todo' && this.empresa == 'todo') {
      this.filter_array = this.centros.filter((x) => x.idProvincia === this.provincia);
      console.log(this.filter_array);
      console.log(this.provincia.toString());
    } else {
      this.filter_array = this.centros.filter(
        (x) => x.nombre === this.empresa
      );
      this.filter_array = this.filter_array.filter(
        (x: { idProvincia: any }) => x.idProvincia === this.provincia
      );
    }
    //console.log(this.filter_array);
    this.centros = this.filter_array;
  }

}

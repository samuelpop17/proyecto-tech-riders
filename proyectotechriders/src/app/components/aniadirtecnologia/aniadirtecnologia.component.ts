import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { PeticionTecnologia } from 'src/app/models/PeticionTecnologia';




@Component({
  selector: 'app-aniadirtecnologia',
  templateUrl: './aniadirtecnologia.component.html',
  styleUrls: ['./aniadirtecnologia.component.css']
})
export class AniadirtecnologiaComponent implements OnInit{
  public role!: number | null;
  public peticionesTecnologias!: PeticionTecnologia[];
  // public charlas: any[] = [];

  ngOnInit(): void {
    if (this.role != localStorage.getItem('role'))
      this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) {
      this.cargarDatos();
    } else {
      this._router.navigate(['/']);
    }
  }
  constructor(private _service: ServicePrincipal, private _router: Router) { }

  cargarDatos(){
    this._service.getPeticionesTecnologia().subscribe((response) => {
      this.peticionesTecnologias = response;
      //console.log(this.peticionesTecnologias);
    })
  }

  insertTeconologia(nombre:string, idPeticionTecnologia:number){
    this._service.insertTecnologia(nombre).subscribe((response) => {
      console.log(response);
      console.log(nombre);
      this.cargarDatos();
      this.EliminarAcreditacion(idPeticionTecnologia);
    })

  }
  EliminarAcreditacion(idPeticionTecnologia:number) {
    this._service.deleteTeconologia(idPeticionTecnologia).subscribe((response)=>{
      this.cargarDatos();
      console.log(response)
    })
  }

}

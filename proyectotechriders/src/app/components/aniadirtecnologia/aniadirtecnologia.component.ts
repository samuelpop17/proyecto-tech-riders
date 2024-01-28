import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { PeticionTecnologia } from 'src/app/models/PeticionTecnologia';

@Component({
  selector: 'app-aniadirtecnologia',
  templateUrl: './aniadirtecnologia.component.html',
  styleUrls: ['./aniadirtecnologia.component.css'],
})
export class AniadirtecnologiaComponent implements OnInit {
  public role!: number | null;
  public peticionesTecnologias!: PeticionTecnologia[];
  public tecnologiasCargadas: boolean = false;

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role == 1) this.cargarDatos();
  }

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  cargarDatos() {
    this.tecnologiasCargadas = false;
    this._service.getPeticionesTecnologia().subscribe((response) => {
      this.peticionesTecnologias = response;
      this.tecnologiasCargadas = true;
    });
  }

  insertTeconologia(nombre: string, idPeticionTecnologia: number) {
    this._service.insertTecnologia(nombre).subscribe((response) => {
      this.eliminarPeticion(idPeticionTecnologia);
    });
  }
  eliminarPeticion(idPeticionTecnologia: number) {
    this._service
      .deletePeticionTecnologia(idPeticionTecnologia)
      .subscribe((response) => {
        this.cargarDatos();
      });
  }
}

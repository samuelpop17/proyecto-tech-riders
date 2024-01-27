import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePrincipal } from 'src/app/services/service.principal';
@Component({
  selector: 'app-proponer-tecnologia',
  templateUrl: './proponer-tecnologia.component.html',
  styleUrls: ['./proponer-tecnologia.component.css'],
})
export class ProponerTecnologiaComponent implements OnInit {
  constructor(private _router: Router, private _service: ServicePrincipal) {}

  @ViewChild('controlnombre') controlNombre!: ElementRef;
  @ViewChild('selecttipo') selectTipo!: ElementRef;

  public tecnologias!: any[];

  ngOnInit(): void {
    // TechRider
    this._service.getTipoTecnologias().subscribe((response) => {
      this.tecnologias = response;
    });
  }
  enviarSolicitud(): void {
    this._service
      .createPeticionTecnologia(this.controlNombre.nativeElement.value)
      .subscribe((response) => {
        this._router.navigate(['/usuario/editar-tecnologias']);
      });

    //al enviar la solicitud de nueva tecnologia es importante saber que el TiposPeticionesCategorias el rol es=4
  }
}

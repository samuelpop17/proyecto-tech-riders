import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePrincipal } from 'src/app/services/service.principal';
@Component({
  selector: 'app-proponer-tecnologia',
  templateUrl: './proponer-tecnologia.component.html',
  styleUrls: ['./proponer-tecnologia.component.css'],
})
export class ProponerTecnologiaComponent implements OnInit {
  public tiposCargados: boolean = false;
  public role!: number | null;

  constructor(private _router: Router, private _service: ServicePrincipal) {}

  @ViewChild('controlnombre') controlNombre!: ElementRef;
  @ViewChild('selecttipo') selectTipo!: ElementRef;

  public tecnologias!: any[];

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      if (this.role == 3 || this.role == 4) {
        this._service.getTipoTecnologias().subscribe((response) => {
          this.tecnologias = response;
          this.tiposCargados = true;
        });
      } else this._router.navigate(['/usuario/perfil']);
    } else this._router.navigate(['/login']);
  }
  enviarSolicitud(): void {
    this._service
      .createPeticionTecnologia(this.controlNombre.nativeElement.value)
      .subscribe((response) => {
        this._service.actualizacionPeticiones();
        this._router.navigate(['/usuario/editar-tecnologias']);
      });

    //al enviar la solicitud de nueva tecnologia es importante saber que el TiposPeticionesCategorias el rol es=4
  }
}

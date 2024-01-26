import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css']
})
export class AltausuarioComponent implements OnInit{

  public peticionesAltas!: any[];

  ngOnInit(): void {

    this._service.getPeticionesAltaUser().subscribe((response) => {
       this.peticionesAltas= response;
    })


  }
  constructor(private _service: ServicePrincipal, private _router: Router) {}

}

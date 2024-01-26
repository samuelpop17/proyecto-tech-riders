import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { PeticionAltaUser } from 'src/app/models/PeticionAltaUser';
import { SolicitudAcreditacionCharla } from 'src/app/models/SolicitudAcreditacionCharla';
import { Charla } from 'src/app/models/Charla';
@Component({
  selector: 'app-acreditarcharla',
  templateUrl: './acreditarcharla.component.html',
  styleUrls: ['./acreditarcharla.component.css']
})
export class AcreditarcharlaComponent implements OnInit {
  public peticionesCharlas!: SolicitudAcreditacionCharla[];
  public charlas: any[] = [];
  public role!: number | null;

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

  cambiarEstado(idCharla: number, idPeticion:number) {
    this._service.cambiarEstadoCharlaAcreditar(idCharla).subscribe((response) => {
      console.log(response);
      this.EliminarAcreditacion(idPeticion);
      this.cargarDatos();
        
    })


  }
  EliminarAcreditacion(idPeticion:number) {
    this._service.cambiarEstadoCharlaEliminar(idPeticion).subscribe((response)=>{
      this.cargarDatos();
      console.log(response)
    })
  }

  cargarDatos(){
    this._service.getAcreditacionesCharlas().subscribe((response) => {
      this.peticionesCharlas = response;
      console.log(this.peticionesCharlas);
      this._service.getCharlas().subscribe((response) => {
        for (let i = 0; i < response.length; i++) {
          for (let j = 0; j < this.peticionesCharlas.length; j++) {
            if (this.peticionesCharlas[j].idCharla == response[i].idCharla) {
              this.charlas.push({ descripcion: response[i].descripcion, 
                fechaCharla: response[i].fechaCharla,
                 fechaSolicitud: response[i].fechaSolicitud, 
                 modalidad: response[i].modalidad, 
                 turno: response[i].turno,
                  idPeticion: this.peticionesCharlas[j].idPeticionCharla });
                  break;

            }
          }

        }
        console.log(this.charlas);
      })
    })
  }

}



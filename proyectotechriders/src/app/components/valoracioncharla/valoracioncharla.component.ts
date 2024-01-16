import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValoracionCharla } from 'src/app/models/ValoracionCharla';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-valoracioncharla',
  templateUrl: './valoracioncharla.component.html',
  styleUrls: ['./valoracioncharla.component.css'],
})
export class ValoracioncharlaComponent implements OnInit {
  public valoracion!: ValoracionCharla;
  public valoExiste: boolean = false;
  public puntuacionValo!: number;

  @ViewChild('controlvaloracion') controlValoracion!: ElementRef;
  @ViewChild('controlcomentario') controlComentario!: ElementRef;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _service: ServicePrincipal,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._activeRoute.params.subscribe((params: Params) => {
        if (params['idcharla']) {
          let idcharla = parseInt(params['idcharla']);
          this.valoracion = {
            idCharla: idcharla,
            idValoracion: 0,
            comentario: '',
            valoracion: 0,
          };
          this._service.findValoracionCharla(idcharla).subscribe((response) => {
            if (response[0] != undefined) this.valoracion = response[0];
            this.valoExiste = true;
            this.puntuacionValo = this.valoracion.valoracion;
          });
        }
      });
    } else this._router.navigate(['/login']);
  }

  changePunt(): void {
    this.puntuacionValo = this.controlValoracion.nativeElement.value;
  }

  editarValoracion(): void {
    this.valoracion.valoracion = this.controlValoracion.nativeElement.value;
    this.valoracion.comentario = this.controlComentario.nativeElement.value;
    if (this.valoracion.idValoracion == 0) {
      this._service
        .createValoracionCharla(this.valoracion)
        .subscribe((response) => {
          this._router.navigate(['/charlas/mis-charlas']);
        });
    } else {
      this._service
        .updateValoracionCharla(this.valoracion)
        .subscribe((response) => {
          this._router.navigate(['/charlas/mis-charlas']);
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePrincipal } from 'src/app/services/service.principal';

@Component({
  selector: 'app-editartecnologiastechrider',
  templateUrl: './editartecnologiastechrider.component.html',
  styleUrls: ['./editartecnologiastechrider.component.css'],
})
export class EditartecnologiastechriderComponent implements OnInit {
  public tecnologias!: any[];
  public allTecnologias!: any[];
  private id!: number;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.id = parseInt(localStorage.getItem('idUsuario') ?? '0');
      this._service.findTecnologiasTechRider(this.id).subscribe((response) => {
        this.tecnologias = response;
        this._service.getTecnologias().subscribe((response) => {
          this.allTecnologias = response;
          let idsTecnologias = this.tecnologias.map(
            (tecnologia) => tecnologia.idTecnologia
          );
          this.allTecnologias = this.allTecnologias.filter(
            (tecnologia) => !idsTecnologias.includes(tecnologia.idTecnologia)
          );
        });
      });
    } else this._router.navigate(['/login']);
  }

  eliminarTecnologia(idTecnologia: number): void {
    this._service
      .deleteTecnologiaTechRider(this.id, idTecnologia)
      .subscribe((response) => {
        this._router.navigate(['/usuario/perfil']);
      });
  }

  anyadirTecnologia(idTecnologia: number): void {
    console.log(this.id);
    console.log(idTecnologia);
    this._service
      .insertTecnologiaTechRider(this.id, idTecnologia)
      .subscribe((response) => {
        this._router.navigate(['/usuario/perfil']);
      });
  }
}

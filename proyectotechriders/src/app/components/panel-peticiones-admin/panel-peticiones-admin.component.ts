import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-peticiones-admin',
  templateUrl: './panel-peticiones-admin.component.html',
  styleUrls: ['./panel-peticiones-admin.component.css'],
})
export class PanelPeticionesAdminComponent {
  public role!: number | null;
  public peticionesCargadas: boolean = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.role = parseInt(localStorage.getItem('role') ?? '0');
    if (this.role != 1) this._router.navigate(['/usuario/perfil']);
  }
}

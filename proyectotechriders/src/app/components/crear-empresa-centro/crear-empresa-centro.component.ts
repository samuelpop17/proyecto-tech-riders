import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Provincia } from 'src/app/models/Provincia';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { Router } from '@angular/router';
import { EmpresaCentro } from 'src/app/models/EmpresaCentro';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-crear-empresa-centro',
  templateUrl: './crear-empresa-centro.component.html',
  styleUrls: ['./crear-empresa-centro.component.css'],
})
export class CrearEmpresaCentroComponent implements OnInit {
  @ViewChild('nombre') nombre!: ElementRef;
  @ViewChild('direccion') direccion!: ElementRef;
  @ViewChild('telefono') telefono!: ElementRef;
  @ViewChild('personaContacto') personaContacto!: ElementRef;
  @ViewChild('cif') cif!: ElementRef;
  @ViewChild('selectprovincia') selectprovincia!: ElementRef;
  @ViewChild('razonSocial') razonSocial!: ElementRef;

  public provincias!: Provincia[];
  public nomRepresentante!: string;
  public role!: number | null;
  public isEmpresaOrCentro!: number;

  constructor(private _service: ServicePrincipal, private _router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.role = parseInt(localStorage.getItem('role') ?? '0');
      this.isEmpresaOrCentro = this._router.url == '/crear-empresa' ? 1 : 2;
      if (this.role == 1 || (this.isEmpresaOrCentro == 1 && this.role == 4)) {
        this._service.getProvincias().subscribe((response) => {
          this.provincias = response;
        });

        if (this.role == 4) {
          this._service.getPerfilUsuario().subscribe((response) => {
            this.nomRepresentante = response.nombre + ' ' + response.apellidos;
          });
        } else this.nomRepresentante = '-';
      } else this._router.navigate(['/usuario/perfil']);
    } else this._router.navigate(['/login']);
  }

  registerEmpresaCentro(): void {
    let empresaCentro: EmpresaCentro = {
      idEmpresaCentro: 0,
      nombre: this.nombre.nativeElement.value,
      direccion: this.direccion.nativeElement.value,
      telefono: this.telefono.nativeElement.value,
      personaContacto: this.personaContacto.nativeElement.value,
      cif: this.cif.nativeElement.value,
      idProvincia: this.selectprovincia.nativeElement.selectedOptions[0].value,
      idTipoEmpresa: this.isEmpresaOrCentro,
      estadoEmpresa: this.role == 1 ? 1 : 0,
      razonSocial: this.razonSocial.nativeElement.value,
    };

    this._service.createEmpresaCentro(empresaCentro).subscribe((response) => {
      if (this.role == 1) {
        this.isEmpresaOrCentro == 1
          ? this._router.navigate(['/listadosempresas'])
          : this._router.navigate(['/listadoscentros']);
      } else {
        let idEmpresaCentro = response.idEmpresaCentro;
        this._service
          .findUsuario(parseInt(localStorage.getItem('idUsuario') ?? '0'))
          .subscribe((response) => {
            let usuario: Usuario = response;
            usuario.idEmpresaCentro = idEmpresaCentro;
            this._service.editUsuario(usuario).subscribe((response) => {
              this._service
                .createPeticionAltaEmpresa(idEmpresaCentro)
                .subscribe((response) => {
                  if (this.isEmpresaOrCentro == 1) {
                    this._service.actualizacionPeticiones();
                    Swal.fire({
                      color: '#333333',
                      icon: 'success',
                      showConfirmButton: false,
                      text: 'Empresa creada. Tendrá que ser validada por el administrador',
                      timer: 4000,
                      timerProgressBar: true,
                      title: 'Registro con éxito',
                    }).then((result) => {
                      this._router.navigate(['/usuario/perfil']);
                    });
                  }
                });
            });
          });
      }
    });
  }
}

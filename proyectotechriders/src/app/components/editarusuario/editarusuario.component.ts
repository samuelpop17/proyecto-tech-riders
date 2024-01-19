import {
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/models/Provincia';
import { Usuario } from 'src/app/models/Usuario';
import { ServicePrincipal } from 'src/app/services/service.principal';
import { EmpresaCentro } from 'src/app/models/EmpresaCentro';
import { Role } from 'src/app/models/Role';
@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css'],
})
export class EditarusuarioComponent implements OnInit {
  public usuario!: Usuario;
  public provincias!: Provincia[];
  public empresaCentro!: EmpresaCentro;
  public role!: number;

  // usuario
  @ViewChild('controlnombre') controlNombre!: ElementRef;
  @ViewChild('controlapellidos') controlApellidos!: ElementRef;
  @ViewChild('controlemail') controlEmail!: ElementRef;
  @ViewChild('controltelefono') controlTelefono!: ElementRef;
  @ViewChild('controllinkedin') controlLinkedin!: ElementRef;
  @ViewChild('selectprovincia') selectProvincia!: ElementRef;

  //emrpesa
  @ViewChild('controlnombreempresa') controlnombreempresa!: ElementRef;
  @ViewChild('controltelefonoempresa') controltelefonoempresa!: ElementRef;
  @ViewChild('cif') cif!: ElementRef;
  @ViewChild('direccion') direccion!: ElementRef;
  @ViewChild('personaContacto') personaContacto!: ElementRef;
  @ViewChild('razonsocial') razonsocial!: ElementRef;


  constructor(private _service: ServicePrincipal, private _router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this._service.getPerfilUsuario().subscribe((response) => {
        this.usuario = response;
        this.role = parseInt(localStorage.getItem('role') ?? '0');
        this._service.getProvincias().subscribe((response) => {
          this.provincias = response;
          this._service
            .findEmpresaCentro(this.usuario.idEmpresaCentro)
            .subscribe((response) => {
              this.empresaCentro = response;
              console.log(response)
            });

        });
      });


    } else this._router.navigate(['/login']);


  }

  editarPerfil(): void {
    let usuario: Usuario = {
      idUsuario: this.usuario.idUsuario,
      nombre: this.controlNombre.nativeElement.value,
      apellidos: this.controlApellidos.nativeElement.value,
      email: this.controlEmail.nativeElement.value,
      telefono: this.controlTelefono.nativeElement.value,
      linkedIn: this.controlLinkedin.nativeElement.value,
      password: this.usuario.password,
      idRole: this.usuario.idRole,
      idProvincia: this.selectProvincia.nativeElement.selectedOptions[0].value,
      idEmpresaCentro: this.usuario.idEmpresaCentro,
      estado: this.usuario.estado,
    };

    let empresa:EmpresaCentro={
      idEmpresaCentro: this.empresaCentro.idEmpresaCentro,
  nombre: this.controlnombreempresa.nativeElement.value,
  direccion: this.direccion.nativeElement.value,
  telefono: this.controltelefonoempresa.nativeElement.value,
  personaContacto: this.personaContacto.nativeElement.value,
  cif: this.cif.nativeElement.value,
  idProvincia: this.empresaCentro.idProvincia,
  razonSocial: this.razonsocial.nativeElement.value,
  idTipoEmpresa: this.empresaCentro.idTipoEmpresa

    }
    this._service.editUsuario(usuario).subscribe((response) => {
      if (this.role == 4) {
        this._service.editEmpresaUsuarioRepresentante(empresa).subscribe((response) => {
      
          this._router.navigate(['/usuario/perfil']);
        });
      } else 
      this._router.navigate(['/usuario/perfil']);
    });


    

    
  }
}

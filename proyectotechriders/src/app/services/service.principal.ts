import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../models/Usuario';
import { Charla } from '../models/Charla';
import { ValoracionCharla } from '../models/ValoracionCharla';
import { EmpresaCentro } from '../models/EmpresaCentro';
import { Curso } from '../models/Curso';

@Injectable()
export class ServicePrincipal {
  // Observable y observer con el número de peticiones pendientes
  // PERMITE CAMBIAR EL NÚMERO EN UN COMPONENTE DE PETICIONES Y QUE SE ACTUALIZE EN EL MENÚ
  private peticionesActualizadas = new BehaviorSubject<number>(0);
  // Menú se suscribe a numPeticiones$ para actualizarse a tiempo real
  numPeticiones$ = this.peticionesActualizadas.asObservable();

  // Actualiza el número de peticiones pendientes
  actualizacionPeticiones() {
    this.getAllPeticiones().subscribe((response: any[]) =>
      this.peticionesActualizadas.next(response.length)
    );
  }

  // Num charlas pendientes
  private charlasActualizadas = new BehaviorSubject<number>(0);
  numCharlas$ = this.charlasActualizadas.asObservable();
  actualizacionCharlas() {
    this.charlasPorVerTechRiders().subscribe((response: any[]) => {
      this.charlasActualizadas.next(response.length);
    });
  }

  constructor(private _http: HttpClient) {}

  //#region AUTH
  loginUser(email: string, password: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Auth/Login';
    let json = JSON.stringify({
      email: email,
      password: password,
    });
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(url + request, json, { headers: header });
  }
  //#endregion

  //#region USUARIOS
  getPerfilUsuario(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/PerfilUsuario';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }

  editUsuario(usuario: Usuario): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios';
    let json = JSON.stringify(usuario);
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, json, { headers: header });
  }

  getUsuarios(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }

  updatePasswordUsuario(id: number, password: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/UpdatePasswordUsuario';
    let json = JSON.stringify({
      idUser: id,
      password: password,
    });
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, json, { headers: header });
  }

  createUsuario(usuario: Usuario): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios';
    let header = {
      'Content-Type': 'application/json',
    };
    let json = JSON.stringify(usuario);
    return this._http.post(url + request, json, { headers: header });
  }

  cambiarEstadoUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/usuarios/updateestadousuario/' + idUsuario + '/1';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.put(url + request, null, { headers: header });
  }

  deleteUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/' + idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }

  findUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/' + idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }
  //#endregion

  //#region PROVINCIAS
  findProvincia(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Provincias/' + id;
    return this._http.get(url + request);
  }

  getProvincias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Provincias';
    return this._http.get(url + request);
  }
  //#endregion

  //#region EMPRESASCENTROS
  findEmpresaCentro(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros/' + id;
    return this._http.get(url + request);
  }

  editEmpresaUsuarioRepresentante(empresa: EmpresaCentro): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros';
    let json = JSON.stringify(empresa);
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, json, { headers: header });
  }

  getEmpresasCentros(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros';
    return this._http.get(url + request);
  }

  createEmpresaCentro(empresaCentro: EmpresaCentro): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros';
    let json = JSON.stringify(empresaCentro);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }

  cambiarEstadoEmpresaCentro(idEmpresa: number): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/empresascentros/updateestadoempresacentro/' + idEmpresa + '/1';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.put(url + request, null, { headers: header });
  }

  getEmpresasCentrosActivas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros/EmpresasCentrosEstado/1';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }
  //#endregion

  //#region ROLES
  findRole(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Roles/' + id;
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }
  //#endregion

  //#region CHARLAS
  asignarseUnaCharlaTechRider(
    idtech: number,
    idcharla: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/Charlas/AsociarTechriderCharla/' + idtech + '/' + idcharla;

    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.put(url + request, null, { headers: header });
  }

  updateEstadoCharla(
    idCharla: number,
    idEstadoCharla: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/Charlas/UpdateEstadoCharla/' + idCharla + '/' + idEstadoCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.put(url + request, null, { headers: header });
  }

  createCharla(charla: Charla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas';
    let json = JSON.stringify(charla);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }

  getCharlas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas';
    return this._http.get(url + request);
  }

  findCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas/' + idCharla;
    return this._http.get(url + request);
  }

  updateCharla(charla: Charla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Charlas';
    let json = JSON.stringify(charla);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.put(url + request, json, { headers: header });
  }
  //#endregion

  //#region QUERYTOOLS
  findTecnologiasTechRider(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindTecnologiasTechrider';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, {
      headers: header,
      params: { idtechrider: id },
    });
  }

  findCursosProfesor(idProfesor: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCursosProfesor/' + idProfesor;
    let header = {
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  findEmpresaCentroUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindEmpresaTechRider/' + idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  getCharlasView(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/CharlasViewAll';
    let header = {
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  getMisTechRidersResponsable(idempresa: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindTechRidersEnEmpresa/' + idempresa;
    return this._http.get(url + request);
  }

  getCharlasTechResponsable(idempresa: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCharlasTechriderEmpresa/' + idempresa;
    return this._http.get(url + request);
  }

  findCharlaView(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCharlaView';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, {
      headers: header,
      params: { idcharla: idCharla },
    });
  }

  charlasPorVerTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCharlasPendientesTecnologiasTechrider';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  estadoCharlasTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/QueryTools/CharlasTechRider/' + localStorage.getItem('idUsuario');
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  getTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/querytools/todostechridersactivos';
    return this._http.get(url + request);
  }

  getAllPeticiones(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/TodasPeticionesFormato';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  getTecnologiasTechRider(idTechRider: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindTecnologiasTechrider';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, {
      headers: header,
      params: { idtechrider: idTechRider },
    });
  }
  //#endregion

  //#region TECNOLOGIAS
  getTecnologias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Tecnologias';
    return this._http.get(url + request);
  }

  findTecnologia(idTecnologia: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Tecnologias/' + idTecnologia;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  insertTecnologia(nombre: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/tecnologias';
    let json = JSON.stringify({
      idTecnologia: 0,
      nombreTecnologia: nombre,
      idTipoTecnologia: 1,
    });
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }
  //#endregion

  //#region TIPOTECNOLOGIAS
  getTipoTecnologias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TipoTecnologias';
    return this._http.get(url + request);
  }
  //#endregion

  //#region TECNOLOGIASTECHRIDERS
  insertTecnologiaTechRider(
    idUsuario: number,
    idTecnologia: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TecnologiasTechRiders';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, null, {
      headers: header,
      params: {
        idtechrider: idUsuario,
        idtecnologia: idTecnologia,
      },
    });
  }

  deleteTecnologiaTechRider(
    idUsuario: number,
    idTecnologia: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/TecnologiasTechRiders/Delete/' + idUsuario + '/' + idTecnologia;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }
  //#endregion

  //#region PETICIONESCENTROEMPRESA
  createPeticionAltaEmpresa(idEmpresaCentro: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesCentroEmpresa';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.post(url + request, null, {
      headers: header,
      params: { idcentroempresa: idEmpresaCentro },
    });
  }

  getPeticionesCentroEmpresa(): Observable<any> {
    let url = environment.urlApi;
    let request = '/api/PeticionesCentroEmpresa';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  deletePeticionEmpresa(idPeticion: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/peticionescentroempresa';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.delete(url + request, {
      headers: header,
      params: { idPeticion: idPeticion },
    });
  }

  anularPeticionEmpresa(idPeticion: number): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/PeticionesCentroEmpresa/DeletePeticionEmpresaAll/' + idPeticion;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }
  //#endregion

  //#region CURSOS
  getCursos(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Cursos';
    return this._http.get(url + request);
  }

  createCurso(curso: Curso): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Cursos';
    let json = JSON.stringify(curso);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }
  //#endregion

  //#region CURSOSPROFESORES
  deleteCursoProfesor(idCurso: number, idProfesor: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/CursosProfesores';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, {
      headers: header,
      params: {
        idcurso: idCurso,
        idprofesor: idProfesor,
      },
    });
  }

  insertCursoProfesor(idCurso: number, idProfesor: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/CursosProfesores';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, null, {
      headers: header,
      params: {
        idcurso: idCurso,
        idprofesor: idProfesor,
      },
    });
  }
  //#endregion

  //#region ESTADOSCHARLAS
  getEstadosCharlas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EstadosCharlas';
    return this._http.get(url + request);
  }
  //#endregion

  //#region TECNOLOGIASCHARLAS
  createTecnologiaCharla(
    idCharla: number,
    idTecnologia: number
  ): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TecnologiasCharlas';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, null, {
      headers: header,
      params: {
        idcharla: idCharla,
        idtecnologia: idTecnologia,
      },
    });
  }

  getTecnologiasCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TecnologiasCharlas/ByCharla/' + idCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }
  //#endregion

  //#region PETICIONESALTAUSERS
  createPeticionAltaUser(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesAltaUsers';
    return this._http.post(url + request, null, {
      params: { iduser: idUsuario },
    });
  }

  getPeticionesAltaUser(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesAltaUsers';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  eliminarPeticionUsuario(idPeticion: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/peticionesaltausers';
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.delete(url + request, {
      headers: header,
      params: { idPeticion: idPeticion },
    });
  }
  //#endregion

  //#region VALORACIONESCHARLAS
  findValoracionCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/ValoracionesCharlas/Valoraciones/' + idCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  createValoracionCharla(valoracion: ValoracionCharla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/ValoracionesCharlas';
    let json = JSON.stringify(valoracion);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.post(url + request, json, { headers: header });
  }

  updateValoracionCharla(valoracion: ValoracionCharla): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/ValoracionesCharlas';
    let json = JSON.stringify(valoracion);
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.put(url + request, json, { headers: header });
  }
  //#endregion

  //#region SOLICITUDACREDITACIONESCHARLAS
  getAcreditacionesCharlas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/SolicitudAcreditacionesCharlas';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  solicitudAcreditacionEliminar(idPeticionCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/solicitudacreditacionescharlas/' + idPeticionCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }

  createSolicitudAcreditacionCharla(idCharla: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/SolicitudAcreditacionesCharlas';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.post(url + request, null, {
      headers: header,
      params: { idcharla: idCharla },
    });
  }
  //#endregion

  //#region PETICIONESTECNOLOGIAS
  getPeticionesTecnologia(): Observable<any> {
    let url = environment.urlApi;
    let request = '/api/PeticionesTecnologias';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  deletePeticionTecnologia(idPeticionTecnologia: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/peticionestecnologias/' + idPeticionTecnologia;
    let header = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.delete(url + request, { headers: header });
  }

  createPeticionTecnologia(tecnologiaNom: string): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesTecnologias';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.post(url + request, null, {
      headers: header,
      params: { tecnologia: tecnologiaNom },
    });
  }
  //#endregion
}

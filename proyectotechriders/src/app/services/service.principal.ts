import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../models/Usuario';
import { Tecnologia } from '../models/Tecnologia';
import { TecnologiaTechRiders } from '../models/TecnologiaTechRiders';
import { Charla } from '../models/Charla';
import { ValoracionCharla } from '../models/ValoracionCharla';
import { EmpresaCentro } from '../models/EmpresaCentro';

@Injectable()
export class ServicePrincipal {
  constructor(private _http: HttpClient) {}

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

  getPerfilUsuario(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/PerfilUsuario';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }

  findProvincia(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Provincias/' + id;
    return this._http.get(url + request);
  }

  findEmpresaCentro(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros/' + id;
    return this._http.get(url + request);
  }

  findRole(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Roles/' + id;
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }

  getProvincias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Provincias';
    return this._http.get(url + request);
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

  getUsuarios(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios';
    let header = new HttpHeaders({
      Authorization: 'bearer ' + localStorage.getItem('token'),
    });
    return this._http.get(url + request, { headers: header });
  }

  findUsuario(id: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Usuarios/' + id;
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

  getTecnologias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Tecnologias';
    return this._http.get(url + request);
  }

  getTipoTecnologias(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/TipoTecnologias';
    return this._http.get(url + request);
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

  getEmpresasCentros(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EmpresasCentros';
    return this._http.get(url + request);
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

  findCursosProfesor(idProfesor: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCursosProfesor/' + idProfesor;
    let header = {
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  getCursos(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Cursos';
    return this._http.get(url + request);
  }

  findEmpresaCentroUsuario(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindEmpresaTechRider/' + idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

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

  getCharlasView(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/CharlasViewAll';
    let header = {
      Authorization: 'bearer ' + localStorage.getItem('token'),
    };
    return this._http.get(url + request, { headers: header });
  }

  getEstadosCharlas(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/EstadosCharlas';
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

  findTecnologia(idTecnologia: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/Tecnologias/' + idTecnologia;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
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

  createPeticionAltaUser(idUsuario: number): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesAltaUsers';
    return this._http.post(url + request, null, {
      params: { iduser: idUsuario },
    });
  }

  charlasPorVerTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/QueryTools/FindCharlasPendientesTecnologiasTechrider';
    console.log('hola2: ' + localStorage.getItem('token'));
    console.log('hola3: ' + url + request);
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  estadoCharlasTechRiders(): Observable<any> {
    let url = environment.urlApi;
    let request =
      'api/QueryTools/CharlasTechRider/?idtechrider=' + environment.idUsuario;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

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

  getTechRiders (): Observable<any>{
    let url = environment.urlApi;
    let request="api/querytools/todostechridersactivos";
    return this._http.get(url + request);

  }
  getPeticionesAltaUser(): Observable<any> {
    let url = environment.urlApi;
    let request = 'api/PeticionesAltaUsers';
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  getAcreditacionesCharlas(): Observable<any>{
    let url = environment.urlApi;
    let request= "api/SolicitudAcreditacionesCharlas";
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }

  cambiarEstadoCharlaAcreditar(idCharla:number): Observable<any>{
    let url = environment.urlApi;
    let request = "api/charlas/updateestadocharla/"+idCharla+"/6";
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.put(url + request,null, { headers: header });
  }
  cambiarEstadoCharlaEliminar(idPeticionCharla:number): Observable<any>{
    let url = environment.urlApi;
    let request = "api/solicitudacreditacionescharlas/"+idPeticionCharla;
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.delete(url + request, { headers: header });
  }
  getPeticionesTecnologia(): Observable<any>{
    let url = environment.urlApi;
    let request= "/api/PeticionesTecnologias";
    let header = { Authorization: 'bearer ' + localStorage.getItem('token') };
    return this._http.get(url + request, { headers: header });
  }
  
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Usuario } from '../models/Usuario';
import { Tecnologia } from '../models/Tecnologia';
import { TecnologiaTechRiders } from '../models/TecnologiaTechRiders';

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

  updatePasswordUsuario(id: number, password: string) {
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
}

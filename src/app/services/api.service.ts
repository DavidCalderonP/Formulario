import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sucursal} from "../models/sucursal";
import {Observable} from "rxjs";
import { environment } from "../../environments/environment";
import {rendererTypeName} from "@angular/compiler";
import {Usuario} from "../models/usuario";



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getSucursales():Observable<any>{
    return this.http.get(environment.API.sucursalesUrl);
  }

  saveSucursal(sucursal: Sucursal):Observable<any>{
    return this.http.post(environment.API.sucursalesUrl, sucursal);
  }

  deleteSucursal(sucursal: Sucursal): Observable<any>{
    return this.http.delete(`${environment.API.sucursalesUrl}${sucursal.id}`);
  }

  updateSucursal(sucursal: Sucursal, newSucursal: Sucursal){
    return this.http.put(`${environment.API.sucursalesUrl}${sucursal.id}`, newSucursal)
  }

  getUsuarios():Observable<any>{
    return this.http.get(`${environment.API.usuariosUrl}`);
  }

  saveUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(environment.API.usuariosUrl, usuario);
  }

  updateUsuario(usuario: Usuario, newUsuario: Usuario){
    return this.http.put(`${environment.API.usuariosUrl}${usuario.id}`,newUsuario);
  }

}

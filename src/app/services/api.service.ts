import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sucursal} from "../models/sucursal";
import {Observable} from "rxjs";
import { environment } from "../../environments/environment";



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

  updateSucursal(sucursal: Sucursal){
    return this.http.put(`${environment.API.sucursalesUrl}${sucursal.id}`, sucursal)
  }

}

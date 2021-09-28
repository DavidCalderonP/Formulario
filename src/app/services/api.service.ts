import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Sucursal} from "../models/sucursal";
import {Observable, ObservableInput} from "rxjs";
import {environment} from "../../environments/environment";
import {Usuario} from "../models/usuario";
import {ConfirmacionDialogComponent} from "../components/confirmacion-dialog/confirmacion-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Cliente} from "../models/cliente";
import {catchError} from "rxjs/operators";
import {error} from "@angular/compiler/src/util";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private logged: boolean;

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router) {}

  toLocalStorage(respuesta: any) {
    for (const res in respuesta) {
      localStorage.setItem(res, respuesta[res]);
    }
  }

  clearLocalStorage(){
    localStorage.clear();
  }

  openConfirmationDialog(): Observable<boolean> {
    return this.dialog
      .open(ConfirmacionDialogComponent, {
        data: `¿Desea confirmar la operación?`
      }).afterClosed()
  }

  getSucursales(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    return this.http.get(environment.API.sucursalesUrl, {headers});
  }

  saveSucursal(sucursal: Sucursal): Observable<any> {
    return this.http.post(environment.API.sucursalesUrl, sucursal);
  }

  deleteSucursal(sucursal: Sucursal): Observable<any> {
    return this.http.delete(`${environment.API.sucursalesUrl}${sucursal.id}`);
  }

  updateSucursal(sucursal: Sucursal, newSucursal: Sucursal) {
    return this.http.put(`${environment.API.sucursalesUrl}${sucursal.id}`, newSucursal)
  }

  getUsuarios(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    return this.http.get(`${environment.API.usuariosUrl}`, {headers});
  }

  saveUsuario(usuario: Usuario): Observable<any> {
    console.log('guardando usuario')
    return this.http.post(environment.API.usuariosUrl, usuario);
  }

  updateUsuario(usuario: Usuario, newUsuario: Usuario) {
    console.log("lo que recibe le servicio como nuevo usuario")
    console.log(newUsuario)
    return this.http.put(`${environment.API.usuariosUrl}${usuario.id}`, newUsuario);
  }

  deleteUsuario(usuario: Usuario): Observable<any> {
    return this.http.delete(`${environment.API.usuariosUrl}${usuario.id}`);
  }

  //=========================================================================================

  getClientes(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.get(environment.API.clientesUrl, {headers})
  }

  getCliente(cliente: Cliente): Observable<any> {
    return this.http.get(`${environment.API.usuariosUrl}${cliente.id}`)
  }

  saveCliente(cliente: Cliente) {
    return this.http.post(environment.API.clientesUrl, cliente);
  }

  deleteCliente(cliente: Cliente): Observable<any> {
    return this.http.delete(`${environment.API.clientesUrl}${cliente.id}`);
  }

  updateCliente(cliente: Cliente, newCliente: Cliente) {
    console.log("nuevo cliente")
    console.log(newCliente)
    return this.http.put(`${environment.API.clientesUrl}${cliente.id}`, newCliente);
  }

  getToken(usuario: Usuario | {email: string, password: string}) {
    //let headers = {
    //  headers: new HttpHeaders().set('Content-Type', 'application/form-data')
    //}
    return this.http.post(environment.API.loginUrl, usuario).pipe(
      catchError(err => {
        return err;
      })
    );
  }

  logout(usuario: Usuario | {email: string, password: string}){
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.post(environment.API.logoutUrl, usuario, {headers}).pipe(
      catchError(err => {
        return err;
      })
    );
  }

}

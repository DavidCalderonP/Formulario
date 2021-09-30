import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sucursal} from "../models/sucursal";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Usuario} from "../models/usuario";
import {ConfirmacionDialogComponent} from "../components/confirmacion-dialog/confirmacion-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Cliente} from "../models/cliente";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private jwt: JwtHelperService) {
  }

  isAuthenticated():Promise<any | boolean> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.post(environment.API.validarToken, null, {headers}).toPromise()
      .then(res => {
        console.log(res)
        return true;
      })
      .catch(err => {
        console.log(err)
        return !(err.status>400);
      });

  }

  toLocalStorage(respuesta: any) {
    for (const res in respuesta) {
      localStorage.setItem(res, respuesta[res]);
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  openConfirmationDialog(): Observable<boolean> {
    return this.dialog
      .open(ConfirmacionDialogComponent, {
        data: `¿Desea confirmar la operación?`
      }).afterClosed()
  }

  getRegisterSucursales(): Observable<any> {
    return this.http.get(environment.API.getSucursales,);
  }

  addRegisterUser(usuario: Usuario) {
    return this.http.post(environment.API.addUser, usuario);
  }

  getSucursales(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    return this.http.get(environment.API.sucursalesUrl, {headers});
  }

  saveSucursal(sucursal: Sucursal): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.post(environment.API.sucursalesUrl, sucursal);
  }

  deleteSucursal(sucursal: Sucursal): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.delete(`${environment.API.sucursalesUrl}${sucursal.id}`, {headers});
  }

  updateSucursal(sucursal: Sucursal, newSucursal: Sucursal) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.put(`${environment.API.sucursalesUrl}${sucursal.id}`, newSucursal, {headers})
  }

  getUsuarios(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    return this.http.get(`${environment.API.usuariosUrl}`, {headers});
  }

  saveUsuario(usuario: Usuario): Observable<any> {
    console.log('guardando usuario')
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.post(environment.API.usuariosUrl, usuario, { headers });
  }

  updateUsuario(usuario: Usuario, newUsuario: Usuario) {
    console.log("lo que recibe le servicio como nuevo usuario")
    console.log(newUsuario)
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.put(`${environment.API.usuariosUrl}${usuario.id}`, newUsuario, { headers });
  }

  deleteUsuario(usuario: Usuario): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.delete(`${environment.API.usuariosUrl}${usuario.id}`, {headers});
  }

  //=========================================================================================

  getClientes(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.get(environment.API.clientesUrl, {headers})
  }

  getCliente(cliente: Cliente): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.get(`${environment.API.usuariosUrl}${cliente.id}`, {headers})
  }

  saveCliente(cliente: Cliente) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.post(environment.API.clientesUrl, cliente, { headers });
  }

  deleteCliente(cliente: Cliente): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.delete(`${environment.API.clientesUrl}${cliente.id}`, { headers });
  }

  updateCliente(cliente: Cliente, newCliente: Cliente) {
    console.log("nuevo cliente")
    console.log(newCliente)
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.put(`${environment.API.clientesUrl}${cliente.id}`, newCliente, { headers });
  }

  login(usuario: Usuario | { email: string, password: string }) {
    //let headers = {
    //  headers: new HttpHeaders().set('Content-Type', 'application/form-data')
    //}
    return this.http.post(environment.API.loginUrl, usuario).pipe(
      catchError(err => {
        console.log(err)
        return err;
      })
    );
  }

  logout(usuario: Usuario | { email: string, password: string }) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.post(environment.API.logoutUrl, usuario, {headers}).pipe(
      catchError(err => {
        return err;
      })
    );
  }

  me(){
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    return this.http.post(environment.API.me,null,{headers})
  }

}

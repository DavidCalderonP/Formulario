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
import {ajaxGetJSON} from "rxjs/internal-compatibility";
import {JsonPipe} from "@angular/common";


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
    return this.http.post(environment.API.sucursalesUrl, sucursal, { headers });
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

  loginGoogle(googleKey:string){
    let jsonToken = {
      'token': googleKey
    }
    return this.http.post(environment.API.loginGoogle, jsonToken);
  }

  /*

 console.log("Servicio")



  /*
  return fetonment.API.loginGoogle).then(res=>{
    return fetch(res.url).then(data=>{
      console.log(data)
    })

  })
*/
     /*
     let xhr = new XMLHttpRequest();
     xhr.open("GET", environment.API.loginGoogle, true);
     xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
         var respuesta = JSON.parse(xhr.responseText);
         console.log(respuesta);
       }
     }
     console.log(xhr)
     */
/*
Error token unexpected
     var Httpreq = new XMLHttpRequest(); // a new request
     Httpreq.open("GET",environment.API.loginGoogle,true);
     Httpreq.send(null);
     console.log(Httpreq)
     this.http.get(Httpreq.responseURL).subscribe((res:any)=>{
       res = res.replace(/^\uFEFF/gm, "");
       console.log(res)
     })
     return Httpreq.responseText;
*/
     /*
     Error en el response text
      var xhr = new XMLHttpRequest();
      xhr.open('GET', environment.API.loginGoogle, true);
      xhr.responseType = 'json';
      xhr.send();
      console.log(xhr)
 */
    /*
    Error en el CORS
    return fetch(environment.API.loginGoogle).then(res=>{
      console.log(res)
      fetch(res.url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response.json())
        return response.json();
      })
    })
     */
  //}

  login(usuario: Usuario | { email: string, password: string }) {
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

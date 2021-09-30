import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Sucursal} from "./models/sucursal";
import {ApiService} from "./services/api.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {SucursalDialogComponent} from "./components/sucursal-dialog/sucursal-dialog.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  opened: boolean;

  constructor(public data: ApiService, private router: Router, private snack: MatSnackBar) {}

  generateNewToken() {
    console.log("intentando generar un token")
    let credentials = {
      email: 'david@gmail.com',
      password: '123456'
    };

    this.data.login(credentials).toPromise()
      .then(res=>{
        this.data.toLocalStorage(res);
        this.data.toLocalStorage(credentials);
        console.log(credentials);
        console.log(res);
      })
      .catch(err=>{
        console.log(err)
      })
  }

  logout() {
    let credentials = {
      email: localStorage.getItem('email') || '',
      password: localStorage.getItem('password') || ''
    };
    this.data.logout(credentials).toPromise()
      .then(res => {
        this.data.clearLocalStorage();
        this.router.navigateByUrl('login')
        let ref = this.snack.open(`Sesión cerrada correctamente.`, "Ok!");
        setTimeout(() => {
          ref.dismiss()
        }, 5000)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

}

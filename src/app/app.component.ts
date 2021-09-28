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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  opened: boolean;

  constructor(private data: ApiService, private router: Router) {
  }

  generateNewToken() {
    let credentials = {
      email: 'david@gmail.com',
      password: '123456'
    };

    this.data.getToken(credentials)
      .subscribe(res => {
      this.data.toLocalStorage(res);
      this.data.toLocalStorage(credentials);
      console.log(credentials);
      console.log(res);
    })
  }

  logout(){
    let credentials = {
      email: localStorage.getItem('email') || '',
      password: localStorage.getItem('password') || ''
    };
    this.data.logout(credentials)
      .subscribe(res=>{
        this.data.clearLocalStorage();
        this.router.navigateByUrl('login')
        console.log(res)
      })
  }

}

import { Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Sucursal} from "./models/sucursal";
import {ApiService} from "./services/api.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {SucursalDialogComponent} from "./components/sucursal-dialog/sucursal-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  opened: boolean;

  constructor() {
  }

}

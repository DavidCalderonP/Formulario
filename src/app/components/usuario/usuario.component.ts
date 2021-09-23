import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Usuario} from "../../models/usuario";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {Sucursal} from "../../models/sucursal";
import {MatDialog} from "@angular/material/dialog";
import {SucursalDialogComponent} from "../sucursal-dialog/sucursal-dialog.component";
import {UsuarioDialogComponent} from "../usuario-dialog/usuario-dialog.component";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  displayedColumns: string[] = ['nombre', 'apellido_paterno', 'apellido_materno', 'telefono', 'sucursal_id', 'email', 'acciones'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() focusChange: EventEmitter<MatTabChangeEvent> = new EventEmitter<MatTabChangeEvent>();
  dataSource: MatTableDataSource<Usuario>;

  constructor(private data: ApiService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
    console.log(this.sort)
  }

  getUsuarios(){
    this.data.getUsuarios().subscribe(res=>{
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.paginator)
      console.log(this.sort)
      console.log(this.dataSource)
    })
  }
/*
  deleteSucursal(element: Sucursal){
    console.log(element.id)
    this.data.deleteSucursal(element).subscribe(res=>{
      console.log(res)
      this.getSucursales();
    })
  }
*/

  openDialog(element: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      minWidth: Math.round((screen.width/3))+'px',
      minHeight: Math.round((screen.height/2))+'px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsuarios();
    });

    console.log('Width', Math.round((screen.width/3))+'px');
    console.log('Height', Math.round((screen.height/2))+'px');
  }

  myTabFocusChange(event: MatTabChangeEvent){
    console.log(event);
    if(event['index']===1){
      this.getUsuarios();
    }
  }

}

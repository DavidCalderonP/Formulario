import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {Sucursal} from "../../models/sucursal";
import {ApiService} from "../../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {SucursalDialogComponent} from "../sucursal-dialog/sucursal-dialog.component";
import {Usuario} from "../../models/usuario";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent{

  displayedColumns: string[] = ['nombre', 'calle', 'num_ext', 'num_int', 'colonia', 'cp', 'telefono', 'gerente', 'encargado', "acciones"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() focusChange: EventEmitter<MatTabChangeEvent> = new EventEmitter<MatTabChangeEvent>();
  dataSource: MatTableDataSource<Sucursal>;

  constructor(private data: ApiService, private dialog: MatDialog, private snack: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
    console.log(this.sort)
  }

  getSucursales(){
    this.data.getSucursales().subscribe(res=>{
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.paginator)
      console.log(this.sort)
      console.log(this.dataSource)
    })

  }

  mostrarDialogo(element: Sucursal): void {
    this.data.openConfirmationDialog().subscribe(res=>{
      if(res){
        this.deleteSucursal(element);
      }
    })
  }

  deleteSucursal(element: Sucursal){
    console.log(element.id)
    this.data.deleteSucursal(element).toPromise()
      .then((res)=>{
        console.log(res)
        this.getSucursales();
        let snackRef = this.snack.open("Se eliminó correctamente el registro!", "Ok!")
        setTimeout(()=>{
          snackRef.dismiss();
        },3000)
      })
      .catch((err)=>{
        console.log(err)
        let snackRef = this.snack.open("Ocurrió un error!", "Ok!")
        setTimeout(()=>{
          snackRef.dismiss();
        },3000)
      })
  }

  openDialog(element: Sucursal): void {
    const dialogRef = this.dialog.open(SucursalDialogComponent, {
      minWidth: Math.round((screen.width/3))+'px',
      minHeight: Math.round((screen.height/1.8))+'px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSucursales();
    });


    console.log('Width', Math.round((screen.width/3))+'px');
    console.log('Height', Math.round((screen.height/1.8))+'px');
  }

  myTabFocusChange(event: MatTabChangeEvent){
    console.log(event);
    if(event['index']===1){
      this.getSucursales();
    }
  }

}

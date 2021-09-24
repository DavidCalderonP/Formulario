import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Usuario} from "../../models/usuario";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioDialogComponent} from "../usuario-dialog/usuario-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private data: ApiService, private dialog: MatDialog, private snack: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
    console.log(this.sort)
  }

  mostrarDialogo(element: Usuario): void {
    this.data.openConfirmationDialog().subscribe(res=>{
      if(res){
        this.deleteUSuario(element);
      }
    })
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

  deleteUSuario(element: Usuario){
    console.log(element.id)
    this.data.deleteUsuario(element).toPromise()
      .then((res)=>{
        console.log(res)
        this.getUsuarios();
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

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from "@angular/material/tabs";
import {ApiService} from "../../services/api.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Sucursal} from "../../models/sucursal";
import {Cliente} from "../../models/cliente";
import {SucursalDialogComponent} from "../sucursal-dialog/sucursal-dialog.component";
import {ClienteDialogComponent} from "../cliente-dialog/cliente-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  displayedColumns: string[] = ['denominacion', 'asesor_id', 'sucursal_id', 'requiere_factura', 'email', "acciones"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() focusChange: EventEmitter<MatTabChangeEvent> = new EventEmitter<MatTabChangeEvent>();
  dataSource: MatTableDataSource<Cliente>;

  constructor(private data: ApiService, private dialog: MatDialog, private snack: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
    console.log(this.sort)
  }

  ngOnInit(): void {
  }

  getClientes(){
    this.data.getClientes().subscribe(res=>{
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.paginator)
      console.log(this.sort)
      console.log(this.dataSource)

    })

  }

  myTabFocusChange(event: MatTabChangeEvent){
    console.log(event);
    if(event['index']===1){
      this.getClientes();
    }
  }

  mostrarDialogo(element: Cliente): void {
    console.log(element)
    this.data.openConfirmationDialog().subscribe(res=>{
      if(res){
        this.deleteCliente(element);
      }
    })
  }

  deleteCliente(element: Cliente){
    console.log(element.id)
    this.data.deleteCliente(element).toPromise()
      .then((res)=>{
        console.log(res)
        this.getClientes();
        let snackRef = this.snack.open("Se eliminó correctamente el cliente!", "Ok!")
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
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      minWidth: Math.round((screen.width / 3)) + 'px',
      minHeight: Math.round((screen.height / 1.8)) + 'px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClientes();
    });

  }
}

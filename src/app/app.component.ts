import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
export class AppComponent implements AfterViewInit{
  title = 'Formulario';
  //{"nombre":"Prueba","calle":"8 de enero","num_ext":"5","num_int":null,"colonia":"centro","cp":"80100","telefono":"6673425167","gerente":"luis","encargado":"josue"}

  flag: boolean = false;
  displayedColumns: string[] = ['nombre', 'calle', 'num_ext', 'num_int', 'colonia', 'cp', 'telefono', 'gerente', 'encargado', "acciones"];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() focusChange: EventEmitter<MatTabChangeEvent> = new EventEmitter<MatTabChangeEvent>();
  //form: FormGroup;
  dataSource: MatTableDataSource<Sucursal>;

  constructor(private data: ApiService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
/*
    this.form = new FormGroup({
      nombre: new FormControl(''),
      calle: new FormControl(''),
      numExt: new FormControl(''),
      numInt: new FormControl(''),
      colonia: new FormControl(''),
      cp: new FormControl(''),
      telefono: new FormControl(''),
      gerente: new FormControl(''),
      encargado: new FormControl('')
    })
*/
    this.sort = new MatSort();

    console.log(this.sort)

  }
  ngAfterViewInit() {
    console.log(this.sort)
  }

  getSucursales(){
    this.data.getSucursales().subscribe(res=>{
      this.flag = true;
      // this.dataSource = new MatTableDataSource(res);
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.paginator)
      console.log(this.sort)
      console.log(this.dataSource)
      console.log(this.flag)
    })
  }

  deleteSucursal(element: Sucursal){
    console.log(element.id)
    this.data.deleteSucursal(element).subscribe(res=>{
      console.log(res)
      this.getSucursales();
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

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sucursal} from "../../models/sucursal";
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-sucursal-dialog',
  templateUrl: './sucursal-dialog.component.html',
  styleUrls: ['./sucursal-dialog.component.css']
})
export class SucursalDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SucursalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sucursal, private dataService: ApiService) {
   /*
    this.form = new FormGroup({
      nombre: new FormControl(data.nombre),
      calle: new FormControl(data.calle),
      numExt: new FormControl(data.num_ext),
      numInt: new FormControl(data.num_int),
      colonia: new FormControl(data.colonia),
      cp: new FormControl(data.cp),
      telefono: new FormControl(data.telefono),
      gerente: new FormControl(data.gerente),
      encargado: new FormControl(data.encargado)
    })
    */
  }

  ngOnInit(): void {
    console.log("Data inyectada del dialog en el dialog", this.data)
  }
/*
  enviarFormulario(){
    console.log(this.form)
    console.log(this.data)
    let auxSucursal: Sucursal = {
      calle: this.form.value['calle'],
      colonia: this.form.value['colonia'],
      cp: this.form.value['cp'],
      encargado: this.form.value['encargado'],
      gerente: this.form.value['gerente'],
      nombre: this.form.value['nombre'],
      num_ext:this.form.value['num_ext'],
      num_int:this.form.value['num_int'],
      telefono: this.form.value['telefono'],
    }
    this.dataService.updateSucursal(this.data, auxSucursal).toPromise()
      .then((res)=>{
        console.log("Todo bien")
        this.dialogRef.close();
      })
      .catch((err)=>{
        console.log(err)
      })
  }
*/
}

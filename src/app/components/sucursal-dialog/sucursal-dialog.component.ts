import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sucursal} from "../../models/sucursal";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sucursal-dialog',
  templateUrl: './sucursal-dialog.component.html',
  styleUrls: ['./sucursal-dialog.component.css']
})
export class SucursalDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SucursalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sucursal) {
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
  }

  ngOnInit(): void {
  }

  enviarFormulario(){
    console.log("Click en enviado!")
  }

}

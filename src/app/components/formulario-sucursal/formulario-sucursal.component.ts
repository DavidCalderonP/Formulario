import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Sucursal} from "../../models/sucursal";
import {ApiService} from "../../services/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SucursalDialogComponent} from "../sucursal-dialog/sucursal-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario-sucursal.component.html',
  styleUrls: ['./formulario-sucursal.component.css']
})
export class FormularioSucursalComponent implements OnInit {

  form: FormGroup;
  @Input() dialogRef: MatDialogRef<SucursalDialogComponent>;
  @Input() dataSucursal: any;

  constructor(private data: ApiService, private route: ActivatedRoute, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(res=>console.log(res[0].path))
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      nombre:  new FormControl(this.dataSucursal ? this.dataSucursal['nombre'] || '' : '', [Validators.required, Validators.pattern("^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ ]*$")]),
      calle: new FormControl(this.dataSucursal ? this.dataSucursal['calle'] || '' : '', [Validators.required, Validators.pattern("^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ., ]*$")]),
      numExt: new FormControl(this.dataSucursal ? this.dataSucursal['num_ext'] || '' : '', [Validators.required, Validators.pattern("^[0-9]*$")]),
      numInt: new FormControl(this.dataSucursal ? this.dataSucursal['num_int'] || '' : '', [Validators.pattern("^[0-9]*$")]),
      colonia: new FormControl(this.dataSucursal ? this.dataSucursal['colonia'] || '' : '', [Validators.required, Validators.pattern("^[a-zA-ZÁÉÍÓÚÑÜáéíóúñü., ]*$")]),
      cp: new FormControl(this.dataSucursal ? this.dataSucursal['cp'] || '' : '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(99999), Validators.min(10000)]),
      telefono: new FormControl(this.dataSucursal ? this.dataSucursal['telefono'] || '' : '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      gerente: new FormControl(this.dataSucursal ? this.dataSucursal['gerente'] || '' : '', [Validators.required, Validators.pattern("^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ ]*$")]),
      encargado: new FormControl(this.dataSucursal ? this.dataSucursal['encargado'] || '' : '', [Validators.required, Validators.pattern("^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ ]*$")])
    })
  }
  getControl(control: string):any{
    return this.form.controls[control];
  }

  enviarFormulario() {
    console.log(this.form)
    console.log("Enviar formulario-sucursal en el componenteb individual formulario-sucursal")
    if(this.form.invalid){
      console.log("formulario invalido. No se envió")
      let ref = this.snack.open("El formulario contiene errores, favor de corregir.", "Ok!")
      setTimeout(()=>{
        ref.dismiss();
      },4500)
      return;
    }
    console.log(this.dataSucursal)

    let aux = this.form.value;
    let newSucursal: Sucursal;
    newSucursal = {
      calle: aux['calle'],
      colonia: aux['colonia'],
      cp: aux['cp'],
      encargado: aux['encargado'],
      gerente: aux['gerente'],
      nombre: aux['nombre'],
      num_ext: aux['numExt'],
      num_int: aux['numInt'] || undefined,
      telefono: aux['telefono']
    };

    if(this.dataSucursal) {
      this.data.updateSucursal(this.dataSucursal, newSucursal).toPromise().then(res => {
        console.log(res);
        this.dialogRef.close();
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.data.saveSucursal(newSucursal).toPromise().then(res => {
        console.log(res)
        this.form.reset();
        this.initForm();
      }).catch(err => {
        console.log(err)
      })
    }
  }

}

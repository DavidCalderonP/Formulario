import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Sucursal} from "../../models/sucursal";
import {ApiService} from "../../services/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SucursalDialogComponent} from "../sucursal-dialog/sucursal-dialog.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario-sucursal.component.html',
  styleUrls: ['./formulario-sucursal.component.css']
})
export class FormularioSucursalComponent implements OnInit {

  form: FormGroup;
  @Input() dialogRef: MatDialogRef<SucursalDialogComponent>;
  @Input() dataSucursal: any;

  constructor(private data: ApiService, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(res=>console.log(res[0].path))
    this.form = this.fb.group({
      nombre:  this.dataSucursal ? this.dataSucursal['nombre'] || '' : '',
      calle: this.dataSucursal ? this.dataSucursal['calle'] || '' : '',
      numExt: this.dataSucursal ? this.dataSucursal['num_ext'] || '' : '',
      numInt: this.dataSucursal ? this.dataSucursal['num_int'] || '' : '',
      colonia: this.dataSucursal ? this.dataSucursal['colonia'] || '' : '',
      cp: this.dataSucursal ? this.dataSucursal['cp'] || '' : '',
      telefono: this.dataSucursal ? this.dataSucursal['telefono'] || '' : '',
      gerente: this.dataSucursal ? this.dataSucursal['gerente'] || '' : '',
      encargado: this.dataSucursal ? this.dataSucursal['encargado'] || '' : ''
    })
  }

  enviarFormulario() {
    console.log("Enviar formulario-sucursal en el componenteb individual formulario-sucursal")
    console.log(this.dataSucursal)
    console.log(this.form)
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
      num_int: aux['numInt'],
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
      }).catch(err => {
        console.log(err)
      })
    }
  }

}

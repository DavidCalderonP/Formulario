import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cliente} from "../../models/cliente";
import {ClienteDialogComponent} from "../cliente-dialog/cliente-dialog.component";
import {Usuario} from "../../models/usuario";
import {Sucursal} from "../../models/sucursal";

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {

  optionsUsuarios: Usuario[];
  optionsSucursales: Sucursal[];
  optionsFacturas: { value: string, option: string}[];
  form: FormGroup;
  @Input() dialogRef: MatDialogRef<ClienteDialogComponent>;
  @Input() dataCliente: Cliente;
  public optionCliente: any;

  constructor(private data: ApiService, private route: ActivatedRoute, private snack: MatSnackBar) {

    this.optionsFacturas = [
      { value: "0", option: "No" },
      { value: "1", option: "Si" }
    ];

    this.data.getUsuarios().subscribe(res=>{
      this.optionsUsuarios = res;
      console.log(this.optionsUsuarios)
    })
    this.data.getSucursales().subscribe(res=>{
      this.optionsSucursales = res;
      console.log(this.optionsSucursales)
    })
    if(this.dataCliente){
      this.optionCliente = this.data.getCliente(this.dataCliente);
    }

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      denominacion: new FormControl(this.dataCliente !== undefined ? this.dataCliente['denominacion'] || '' : ''),
      asesor_id: new FormControl(this.dataCliente !== undefined ? this.dataCliente['asesor_id'] || '' : ''),
      sucursal_id: new FormControl(this.dataCliente !== undefined ? this.dataCliente['sucursal_id'] || '' : ''),
      requiere_factura: new FormControl(this.dataCliente !== undefined ? (""+this.dataCliente['requiere_factura']) || '' : ''),
      email: new FormControl(this.dataCliente !== undefined ? this.dataCliente['email'] || '' : '')
  })

  }

  enviarFormulario() {

    console.log(this.form)
    let aux: Cliente = this.form.value;
    console.log(aux)
    let newCliente: Cliente = {
      asesor_id: aux.asesor_id,
      denominacion: aux.denominacion,
      email: aux.email,
      requiere_factura: aux.requiere_factura,
      sucursal_id: aux.sucursal_id
    }

    if(this.dataCliente) {
      this.data.updateCliente(this.dataCliente, newCliente).toPromise().then(res => {
        console.log(res);
        this.dialogRef.close();
        let ref = this.snack.open("Cliente actualizado de manera exitosa!", "Ok!");
        console.log("f34ougfueihwfiewjfionwief")
        setTimeout(()=>{
          ref.dismiss();
        },5000)
      }).catch(err => {
        let ref = this.snack.open("No se pudo actualizar el cliente!", "Ok!");
        setTimeout(()=>{
          ref.dismiss();
        },5000)
        console.log(err.status)
        console.log(err)
      })
    } else {
      this.data.saveCliente(newCliente).toPromise().then(res => {
        console.log(res)
        console.log(this.form)
        this.form.reset();
        let snackRef = this.snack.open("Se agregó correctamente el registro!", "Ok!")
        setTimeout(()=>{
          snackRef.dismiss();
        },3000)
      }).catch(err => {
        console.log("imprimiendo la respuesta del error al crear", err.status)
        this.snack.open("Error. Verificar bien los datos!","Ok!")
        console.log(err)
      })
    }
  }

}

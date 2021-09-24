import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cliente} from "../../models/cliente";
import {ClienteDialogComponent} from "../cliente-dialog/cliente-dialog.component";

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {

  form: FormGroup;
  @Input() dialogRef: MatDialogRef<ClienteDialogComponent>;
  @Input() dataCliente: Cliente;

  constructor(private data: ApiService, private route: ActivatedRoute, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      denominacion: new FormControl(this.dataCliente !== undefined ? this.dataCliente['denominacion'] || '' : ''),
      asesor_id: new FormControl(this.dataCliente !== undefined ? this.dataCliente['asesor_id'] || '' : ''),
      sucursal_id: new FormControl(this.dataCliente !== undefined ? this.dataCliente['sucursal_id'] || '' : ''),
      requiere_factura: new FormControl(this.dataCliente !== undefined ? this.dataCliente['requiere_factura'] || '' : ''),
      email: new FormControl(this.dataCliente !== undefined ? this.dataCliente['sucursal_id'] || '' : '')
  })
  }

  enviarFormulario() {
  /*
    console.log("Enviar formulario-sucursal en el componenteb individual formulario-sucursal")
    console.log(this.dataUsuario)
    console.log(this.form)
    let aux = this.form.value;
    console.log(aux)
    let newUsuarioWtihoutPass : Usuario = {
      apellido_paterno: aux['apellido_paterno'],
      apellido_materno: aux['apellido_materno'],
      email: aux['email'],
      nombre: aux['nombre'],
      sucursal_id: aux['sucursal_id'],
      telefono: aux['telefono'],
    }
    let newUsuarioWithPassword: Usuario;
    newUsuarioWithPassword = {
      ...newUsuarioWtihoutPass,
      password: aux['password']
    }

    if(this.dataUsuario) {
      this.data.updateUsuario(this.dataUsuario,aux['password']==="" ? newUsuarioWtihoutPass : newUsuarioWithPassword).toPromise().then(res => {
        console.log(res);
        this.dialogRef.close();
      }).catch(err => {
        console.log(err.status)
        console.log(err)
      })
    } else {

      this.data.saveUsuario(newUsuarioWithPassword).toPromise().then(res => {
        console.log(res)
        console.log(this.form)
        this.form.reset();
      }).catch(err => {
        console.log("imprimiendo la respuesta del error al crear", err.status)
        this.snack.open("Error. Por favor asegurate de que la sucursal asignada existe!","Ok!")
        console.log(err)
      })
    }
    */
  }

}

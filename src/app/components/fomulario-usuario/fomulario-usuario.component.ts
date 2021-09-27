import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioDialogComponent} from "../usuario-dialog/usuario-dialog.component";
import {Usuario} from "../../models/usuario";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Sucursal} from "../../models/sucursal";

@Component({
  selector: 'app-fomulario-usuario',
  templateUrl: './fomulario-usuario.component.html',
  styleUrls: ['./fomulario-usuario.component.css']
})
export class FomularioUsuarioComponent implements OnInit {

  optionsSucursales: Sucursal[] = [];
  form: FormGroup;
  @Input() dialogRef: MatDialogRef<UsuarioDialogComponent>;
  @Input() dataUsuario: Usuario;

  constructor(private data: ApiService, private route: ActivatedRoute, private snack: MatSnackBar) {
    this.data.getSucursales().subscribe(res=>{
      this.optionsSucursales = res;
      console.log(this.optionsSucursales)
    })

  }

  ngOnInit(): void {
    this.route.url.subscribe(res=>console.log(res[0].path))
    this.form = new FormGroup({
      nombre: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['nombre_usuario'] || '' : ''),
      apellido_paterno: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['apellido_paterno'] || '' : ''),
      apellido_materno: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['apellido_materno'] || '' : ''),
      telefono: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['telefono_usuario'] || '' : ''),
      sucursal_id: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['sucursal_id'] || '' : ''),
      email: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['email'] || '' : ''),
      password: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['password'] || '' : '')
    })
  }

  enviarFormulario() {
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
  }
}

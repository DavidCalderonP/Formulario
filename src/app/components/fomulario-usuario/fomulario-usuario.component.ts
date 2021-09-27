import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
      nombre: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['nombre_usuario'] || '' : '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÑÁÉÍÓÚ ]*$')]),
      apellido_paterno: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['apellido_paterno'] || '' : '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÑÁÉÍÓÚ ]*$')]),
      apellido_materno: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['apellido_materno'] || '' : '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÑÁÉÍÓÚ ]*$')]),
      telefono: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['telefono_usuario'] || '' : '', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      sucursal_id: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['sucursal_id'] || '' : '', [Validators.required]),
      email: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['email'] || '' : '', [Validators.required, Validators.email]),
      password: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['password'] || '' : '',[Validators.required, Validators.minLength(8), Validators.maxLength(15)])
    })
  }

  errores(atributo: string){
    //console.log(this.form.controls.nombre.errors)
    //console.log(this.form.controls[atributo].errors)
    let aux = this.form.controls[atributo].errors;
    if(aux!==null){
      if(aux.hasOwnProperty('required')){
        return `El campo ${atributo} es obligatorio`;
      }
      if(aux.hasOwnProperty('pattern') && atributo==='telefono'){
        return `El campo ${atributo} solo acepta números`;
      }
      if((aux.hasOwnProperty('minlength') || aux.hasOwnProperty('maxlength')) && atributo==='telefono'){
        return `El campo ${atributo} debe tener 10 caracteres`;
      }
      if(aux.hasOwnProperty('pattern')){
        return `El campo ${atributo} solo acepta letras mayúsculas y minusculas`;
      }
      if(aux.hasOwnProperty('minlength') && atributo==='password'){
        return `La contraseña debe contener de 8 a 15 caracteres`;
      }
      if(aux.hasOwnProperty('maxlength') && atributo==='password'){
        return `La contraseña debe contener de 8 a 15 caracteres`;
      }
      if(aux.hasOwnProperty('email')){
        return `El campo ${atributo} debe contener un email válido`;
      }

    }
    //if(this.form.controls[atributo].errors=='required'){
    //  return "Requeridooooo"
    //}
    return ""
  }
  enviarFormulario() {
    console.log("Enviando formulario...")
    console.log(this.form)
    if(this.form.invalid){
      console.log("Formulario inválido")
      return;
    }
    console.log("Enviar formulario-sucursal en el componente individual formulario-sucursal")
    console.log(this.dataUsuario)

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
        this.form.updateValueAndValidity();
      }).catch(err => {
        console.log("imprimiendo la respuesta del error al crear", err.status)
        this.snack.open("Error. Por favor asegurate de que la sucursal asignada existe!","Ok!")
        console.log(err)
      })
    }
  }
}

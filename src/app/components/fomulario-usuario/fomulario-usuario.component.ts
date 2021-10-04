import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioDialogComponent} from "../usuario-dialog/usuario-dialog.component";
import {Usuario} from "../../models/usuario";
import {MatSnackBar} from "@angular/material/snack-bar";

interface SucursalesOptions {
  id: number,
  nombre: string
}

@Component({
  selector: 'app-fomulario-usuario',
  templateUrl: './fomulario-usuario.component.html',
  styleUrls: ['./fomulario-usuario.component.css']
})
export class FomularioUsuarioComponent implements OnInit {

  @Input() fromLogin: boolean;
  optionsSucursales: SucursalesOptions[] = [];
  form: FormGroup;
  @Input() dialogRef: MatDialogRef<UsuarioDialogComponent>;
  @Input() dataUsuario: Usuario;

  constructor(private data: ApiService, private route: ActivatedRoute, private snack: MatSnackBar, private router: Router) {
    this.data.getRegisterSucursales().subscribe((res: SucursalesOptions[]) => {
      this.optionsSucursales = res;
      //console.log(res)
      console.log(this.optionsSucursales)
    })

  }

  ngOnInit(): void {
    this.route.url.subscribe(res => console.log(res[0].path))
    this.form = new FormGroup({
      nombre: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['nombre_usuario'] || '' : '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÑÁÉÍÓÚ ]*$')]),
      apellido_paterno: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['apellido_paterno'] || '' : '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÑÁÉÍÓÚ ]*$')]),
      apellido_materno: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['apellido_materno'] || '' : '', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúñÑÁÉÍÓÚ ]*$')]),
      telefono: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['telefono_usuario'] || '' : '', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      sucursal_id: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['sucursal_id'] || '' : '', [Validators.required]),
      email: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['email'] || '' : '', [Validators.required, Validators.email]),
      password: new FormControl(this.dataUsuario !== undefined ? this.dataUsuario['password'] || '' : '', this.dataUsuario ? [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.12345]).{8,}$')] : [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.12345]).{6,}$'), Validators.required])
    })
  }

  getControl(control: string): any {
    return this.form.controls[control];
  }

  enviarFormulario() {
    console.log("Enviando formulario...")
    console.log(this.form)
    if (this.form.invalid) {
      console.log("Formulario inválido")
      return;
    }
    console.log("Enviar formulario-sucursal en el componente individual formulario-sucursal")
    console.log(this.dataUsuario)

    let aux = this.form.value;
    console.log(aux)
    let newUsuarioWtihoutPass: Usuario = {
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
    let reg = {
      email: this.form.value['email'],
      password: this.form.value['password']
    }

    if (this.fromLogin) {

      this.data.addRegisterUser(newUsuarioWithPassword)
        .toPromise()
        .then(() => {
          this.data.login(reg)
            .toPromise()
            .then(res => {
              this.data.toLocalStorage(res)
              this.data.toLocalStorage(reg);
              this.router.navigateByUrl('sucursales');
              let ref = this.snack.open(`Bienvenido ${newUsuarioWithPassword.nombre} ${newUsuarioWithPassword.apellido_paterno}`, "Ok!")
              setTimeout(() => {
                ref.dismiss();
              }, 7500)
            })
            .catch(err => {
              console.log(err)
              let ref = this.snack.open("Hubo un error al tratar de obtener el token")
              setTimeout(() => {
                ref.dismiss();
              }, 3500)
            })
        })
        .catch(err => {
          console.log(err)
          let ref = this.snack.open("Hubo un error al tratar de obtener crear el usuario")
          setTimeout(() => {
            ref.dismiss();
          }, 3500)
        })
      return;
    }
    if (this.dataUsuario) {
      this.data.updateUsuario(this.dataUsuario, aux['password'] === "" ? newUsuarioWtihoutPass : newUsuarioWithPassword).toPromise().then(res => {
        console.log(res);
        this.dialogRef.close();
        let ref = this.snack.open("El suuario ha sido actualizado exitosamente!", "Ok");
        setTimeout(() => {
          ref.dismiss();
        }, 4500);

      }).catch(err => {
        let ref = this.snack.open("Hubo un problema al actualizar el usuario", "Ok");
        setTimeout(() => {
          ref.dismiss();
        }, 4500);
        console.log(err.status)
        console.log(err)
      })
    } else {
      this.data.saveUsuario(newUsuarioWithPassword).toPromise().then(res => {
        console.log(res)
        console.log(this.form)
        this.form.reset();
        this.form.updateValueAndValidity();
        let ref = this.snack.open("El suuario ha sido creado exitosamente!", "Ok");
        setTimeout(() => {
          ref.dismiss();
        }, 4500);
      }).catch(err => {
        console.log("imprimiendo la respuesta del error al crear", err.status)
        let ref = this.snack.open("Hubo un problema al crear el usuario!", "Ok!")
        setTimeout(() => {
          ref.dismiss();
        }, 4500);
        console.log(err)
      })
    }
  }
}

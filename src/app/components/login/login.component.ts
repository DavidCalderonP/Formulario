import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private data: ApiService, private router: Router, private snack: MatSnackBar) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  logIn(){
    let credentials = {
      email: this.form.value['email'],
      password: this.form.value['password']
    }

    this.data.login(credentials).toPromise()
      .then(res=>{
        this.data.toLocalStorage(res);
        this.data.toLocalStorage(credentials);
        this.router.navigateByUrl('sucursales');
        this.data.me()
          .toPromise()
          .then((res:any)=>{
            let ref = this.snack.open(`Bienvenido ${res.nombre} ${res.apellido_paterno} ${res.apellido_materno}`, "Ok!")
            setTimeout(()=>{
              ref.dismiss()
            },6500)
          })
          .catch()

      })
      .catch(err=>{
        console.log("error al loguearse", err)
      })

    console.log(this.form)
  }

  loginWithGoogle(){
    this.data.loginGoogle().toPromise()
      .then(res=>{
        console.log(res)
    })
      .catch(err=>{
        console.log(err)
    })

  }

}

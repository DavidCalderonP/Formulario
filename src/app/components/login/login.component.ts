import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private data: ApiService, private router: Router) {
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
      })
      .catch(err=>{
        console.log("error al loguearse", err)
      })

    console.log(this.form)
  }

}

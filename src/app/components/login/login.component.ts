import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Usuario} from "../../models/usuario";
import {GoogleService} from "../../services/google.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user : gapi.auth2.GoogleUser;


  constructor(private data: ApiService, private google: GoogleService, private ref: ChangeDetectorRef, private router: Router, private snack: MatSnackBar) {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

  signInWithGoogle(){
    this.google.signIn()
    this.google.getObservable().subscribe((res:any)=>{
      const token = res['$b']['access_token'];
      console.log("En el login ", res['$b']['access_token'])
      this.data.loginGoogle(token).toPromise().then( (res)=>{
        // let ref = this.snack.open("Inicio con Google exitoso, redireccionando...","Ok");
        // setTimeout(()=>{
        //   ref.dismiss();
        // },4000)
        console.log(res)
        this.data.toLocalStorage(res);
        this.router.navigateByUrl('sucursales', { skipLocationChange: false }).then(() => {
          this.router.navigate(['sucursales']);
        });
      }).catch(err=>{
        console.log(err)
      });
     // let ref = this.snack.open(`Sesión iniciada correctamente`,"Ok");
     // setTimeout(()=>{
     //   ref.dismiss();
     // },800)
      this.user = res;
      this.ref.detectChanges();
    })
  }



  logOutWithGoogle(){
    this.google.signOut();
  }

/*
  _listener(){
    var aux = localStorage.getItem('googleToken' || '') || '';
    if(aux!==''){
      this.data.loginGoogle(aux).toPromise()
        .then(
          res=>{
            console.log(res);
          }
        ).catch(err=>{
        console.log(err);
      });
    }
  }
*/
  logIn(){
    let credentials = {
      email: this.form.value['email'],
      password: this.form.value['password']
    }

    this.data.login(credentials).toPromise()
      .then(res=>{
        this.data.toLocalStorage(res);
        this.data.toLocalStorage(credentials);
        this.data.me()
          .toPromise()
          .then((res:any)=>{
            let ref = this.snack.open(`Bienvenido ${res.nombre} ${res.apellido_paterno} ${res.apellido_materno}`, "Ok!")
            this.router.navigateByUrl('sucursales');
            setTimeout(()=>{
              ref.dismiss()
            },3500)
          })
          .catch()

      })
      .catch(err=>{
        console.log("error al loguearse", err)
      })

    console.log(this.form)
  }

}

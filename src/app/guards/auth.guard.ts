import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router, private snack: MatSnackBar) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return await this.api.isAuthenticated().then(res => {
      if (!res) {
        this.router.navigateByUrl('login');
        let ref = this.snack.open("Debes de iniciar sesión primero!", "Ok!");
        setTimeout(()=>{
          ref.dismiss()
        },5000)
        return false;
      }
      return true;
    })
  }

}

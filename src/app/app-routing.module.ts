import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SucursalComponent} from "./components/sucursal/sucursal.component";
import {UsuarioComponent} from "./components/usuario/usuario.component";
import {ClienteComponent} from "./components/cliente/cliente.component";
import {LoginComponent} from "./components/login/login.component";
import {RegistrarComponent} from "./components/registrar/registrar.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: 'sucursales', component: SucursalComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'sucursales' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

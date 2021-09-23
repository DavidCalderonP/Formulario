import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SucursalComponent} from "./components/sucursal/sucursal.component";
import {UsuarioComponent} from "./components/usuario/usuario.component";

const routes: Routes = [
  { path: 'sucursales', component: SucursalComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'sucursales' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

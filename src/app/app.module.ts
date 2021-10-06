import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SucursalDialogComponent } from './components/sucursal-dialog/sucursal-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { FormularioSucursalComponent } from './components/formulario-sucursal/formulario-sucursal.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { FomularioUsuarioComponent } from './components/fomulario-usuario/fomulario-usuario.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ConfirmacionDialogComponent } from './components/confirmacion-dialog/confirmacion-dialog.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FormularioClienteComponent } from './components/formulario-cliente/formulario-cliente.component';
import { ClienteDialogComponent } from './components/cliente-dialog/cliente-dialog.component';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from "@angular/material/card";
import { RegistrarComponent } from './components/registrar/registrar.component';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

@NgModule({
  declarations: [
    AppComponent,
    SucursalDialogComponent,
    FormularioSucursalComponent,
    SucursalComponent,
    NavbarComponent,
    UsuarioComponent,
    UsuarioDialogComponent,
    FomularioUsuarioComponent,
    ConfirmacionDialogComponent,
    ClienteComponent,
    FormularioClienteComponent,
    ClienteDialogComponent,
    LoginComponent,
    RegistrarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatCheckboxModule,
        FormsModule,
        MatSnackBarModule,
        MatCardModule
    ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

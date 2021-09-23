import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.css']
})
export class UsuarioDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UsuarioDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  ngOnInit(): void {
    console.log("Imprimiendo la data que recibe el Dialog")
    console.log(this.data)
  }

}

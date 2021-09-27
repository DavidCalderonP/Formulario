import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Usuario} from "../../models/usuario";
import {Cliente} from "../../models/cliente";

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.css']
})
export class ClienteDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<ClienteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Cliente) { }

  ngOnInit(): void {
    console.log("Imprimiendo la data que recibe el Dialog")
    console.log(this.data)
  }


}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sucursal} from "../../models/sucursal";
import { FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-sucursal-dialog',
  templateUrl: './sucursal-dialog.component.html',
  styleUrls: ['./sucursal-dialog.component.css']
})
export class SucursalDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SucursalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sucursal,
              private dataService: ApiService) {}

  ngOnInit(): void {
    //console.log("Data inyectada del dialog en el dialog", this.data)
  }

}

import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Sucursal} from "../../models/sucursal";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  form: FormGroup;
  @Input() dataSucursal: Sucursal;

  constructor(private data: ApiService) {
    console.log("informacion pasada por template.", this.dataSucursal)

  }

  ngOnInit(): void {
    console.log("informacion pasada por template en el oninit.", this.dataSucursal)
    this.form = new FormGroup({
      nombre: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['nombre'] || '' : ''),
      calle: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['calle'] || '' : ''),
      numExt: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['num_ext'] || '' : ''),
      numInt: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['num_int'] || '' : ''),
      colonia: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['colonia'] || '' : ''),
      cp: new FormControl( this.dataSucursal!==undefined ? this.dataSucursal['cp'] || '' : ''),
      telefono: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['telefono'] || '' : ''),
      gerente: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['gerente'] || '' : ''),
      encargado: new FormControl(this.dataSucursal!==undefined ? this.dataSucursal['encargado'] || '' : '')
    })
  }

  enviarFormulario(){
    console.log("Enviar formulario en el componenteb individual formulario")
    console.log(this.dataSucursal)
      console.log(this.form)
      let aux = this.form.value;
      let newSucursal: Sucursal = {
        calle: aux['calle'],
        colonia: aux['colonia'],
        cp: aux['cp'],
        encargado: aux['encargado'],
        gerente: aux['gerente'],
        nombre: aux['nombre'],
        num_ext: aux['numExt'],
        num_int: aux['numInt'],
        telefono: aux['telefono']
      };

      if(this.dataSucursal){
        console.log("entro al true")
        this.data.updateSucursal(this.dataSucursal,newSucursal).toPromise().then(res=>{
          console.log(res);
          this.form.reset();
        })
        return;
      }else{
        console.log("entro al false")
        this.data.saveSucursal(newSucursal).toPromise().then(res=>{
          console.log(res)
          this.form.reset();
        }).catch(err=>{
          console.log(err)
        })
      }

  }
  /*
  enviarFormulario(){
    console.log(this.form)
    console.log(this.data)
    let auxSucursal: Sucursal = {
      calle: this.form.value['calle'],
      colonia: this.form.value['colonia'],
      cp: this.form.value['cp'],
      encargado: this.form.value['encargado'],
      gerente: this.form.value['gerente'],
      nombre: this.form.value['nombre'],
      num_ext:this.form.value['num_ext'],
      num_int:this.form.value['num_int'],
      telefono: this.form.value['telefono'],
    }
    this.dataService.updateSucursal(this.data, auxSucursal).toPromise()
      .then((res)=>{
        console.log("Todo bien")
        this.dialogRef.close();
      })
      .catch((err)=>{
        console.log(err)
      })
  }
*/
}

import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicionesService } from '@core/service/mediciones.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-medica',
  templateUrl: './informacion-medica.component.html',
  styleUrl: './informacion-medica.component.scss'
})
export class InformacionMedicaComponent {
form!: FormGroup;
imc: number;
loading: boolean;

constructor(
  private fb: FormBuilder,
  private medicionesService: MedicionesService,
  public dialogRef: MatDialogRef<InformacionMedicaComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any
) { 
  this.createForm(); 
  this.imc = 0;
  this.form.valueChanges.subscribe(data=>{
    this.imc = data.peso / Math.pow(data.altura,2)
  })
  if (this.data.estado) {
    this.getById();
    
  }
}
  getById() {
    this.medicionesService.getById(this.data.id).subscribe(data=>{
      this.form.patchValue({
        ...data
      })
    })
  }

createForm() {
  this.form = this.fb.group({
    paciente_id:[this.data.paciente_id],
    fecha:[''],
    peso: ['',],
    altura : ['',],
    imc: [this.imc],
    circunferencia_cintura: ['',],
    circunferencia_caderas: ['',],
    presion_arterial: ['',],
    nivel_actividad: ['',],
    
    glucosa_ayunas: ['',],
    colesterol_total: ['',],
    colesterol_hdl: ['',],
    colesterol_ldl: ['',],
    trigliceridos: ['',],
    hemoglobina: ['',],
  })
}

registerPaciente(form: any) {
  this.loading = true;

  if (this.data.estado) {
    this.medicionesService
      .update(this.data.id, form)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false;
        })
      )
      .subscribe(
        data3 => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exito',
            text: data3.success,
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(data3)
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.loading = false;
        }
      );
  } else {
    this.medicionesService
    .create(form)
    .pipe(
      finalize(() => {
        this.form.markAsPristine();
        this.loading = false;
      })
      ).subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Exito',
            text: data.success,
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close(data)
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error,
          });
          this.loading = false;
        }
      );
  }
}


}

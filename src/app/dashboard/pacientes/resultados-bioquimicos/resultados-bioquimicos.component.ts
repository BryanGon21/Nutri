import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResultadosService } from '@core/service/resultados.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultados-bioquimicos',
  templateUrl: './resultados-bioquimicos.component.html',
  styleUrl: './resultados-bioquimicos.component.scss'
})
export class ResultadosBioquimicosComponent {
  form!: FormGroup;
  imc: number;
  loading: boolean;
  
  constructor(
    private fb: FormBuilder,
    private resultadosService: ResultadosService,
    public dialogRef: MatDialogRef<ResultadosBioquimicosComponent>,
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
      this.resultadosService.getById(this.data.id).subscribe(data=>{
        this.form.patchValue({
          ...data
        })
      })
    }

  createForm() {
    this.form = this.fb.group({
      paciente_id:[this.data.paciente_id],
      fecha:[''],
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
      this.resultadosService
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
      this.resultadosService
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

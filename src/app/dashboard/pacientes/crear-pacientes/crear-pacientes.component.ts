import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from '@core/service/pacientes.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-pacientes',
  templateUrl: './crear-pacientes.component.html',
  styleUrl: './crear-pacientes.component.scss',
  providers:[DatePipe]
})
export class CrearPacientesComponent {
  paciente_id: any;
  form!: FormGroup;
  submitted: boolean;
  loading: boolean;
  imc: number;
  imagen: any;

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacientesService,
    private route:ActivatedRoute,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<CrearPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.createForm();
    this.imc = 0;
    this.form.valueChanges.subscribe(data=>{
      this.imc = data.peso / Math.pow(data.altura,2)
  })
  // this.form.get('imc').setValue(this.imc)
  
    if (this.data.estado) {      
      this.getById();
    }

  }
  getById() {
    this.pacientesService.getById(this.data.id).subscribe(data=>{
      this.form.patchValue({
        nombres: data.nombres,
        apellidos: data.apellidos,
        celular: data.celular,
        residencia:data.residencia,
        ocupacion:data.ocupacion,
        email: data.email,
        genero:data.genero,
        fecha_nacimiento: this.datePipe.transform(data.fecha_nacimiento,'yyyy-MM-dd'),
      })
    })
  }
createForm() {
  this.form = this.fb.group({
    nombres: ['',[Validators.required]
    ],
    apellidos: ['',[Validators.required]
    ],
    fecha_nacimiento: ['',[Validators.required]],
    celular: ['',
      [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern('[0-9]*')
      ]
    ],
    residencia:[''],
    ocupacion:[''],
    email: ['', [Validators.email]],
    genero: ['', [Validators.required]],
    file:['']
  })
}

  agregarFoto(data: any){
    this.imagen = data.file;
  }

  registerPaciente(form: any) {
    this.submitted = true;
    this.loading = true;
    const formData = new FormData();

    formData.append('nombres',form.nombres);
    formData.append('apellidos',form.apellidos);
    formData.append('fecha_nacimiento',form.fecha_nacimiento);
    formData.append('celular',form.celular);
    formData.append('residencia',form.residencia);
    formData.append('ocupacion',form.ocupacion);
    formData.append('email',form.email);
    formData.append('genero',form.genero);

    if (this.imagen) {
      console.log(this.imagen);
      formData.append('file', this.imagen);
     }else{
      formData.append('file', '');
     }

      if (this.data.estado) {
      formData.append("_method", "PUT");
      this.pacientesService
        .updatePost(this.data.id, formData)
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
              title: 'paciente Editado con exito',
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
            this.submitted = false;
            this.loading = false;
          }
        );
    } else {
      this.pacientesService
      .create(formData)
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
              title: 'Paciente creado con exito',
              text: data.succes,
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
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}

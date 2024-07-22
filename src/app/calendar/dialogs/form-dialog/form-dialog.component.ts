import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { PacientesService } from '@core/service/pacientes.service';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/service/user.service';
import { WebMaterialModule } from 'app/webmaterial.module';
import { HasRolesDirective } from 'app/layout/has-roles.directive';
import { CitasService } from '@core/service/citas.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    WebMaterialModule,
    HasRolesDirective,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterLink,
  ],
})
export class FormDialogComponent {
  pacientes: any;
  form!:FormGroup;
  users: any;
  loading: boolean = false;
  paciente: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private pacienteService: PacientesService,
    private userService: UserService,
    private citaService: CitasService,
    private router: Router,

  ) {

    this.controles();
    this.listaPacientes();
    this.listaMedicos();

    if(data.estado){
      this.getById();
    }

  }

  getById() {
    this.citaService.getById(this.data.calendar.id).subscribe(data=>{
      this.paciente = data;
      this.form.patchValue({...data })
    })
  }


  controles() {
    this.form = this.fb.group({
      fecha_inicio:[this.data.estado?'':this.data.calendar.start, Validators.required],
      fecha_fin:[this.data.estado?'':this.data.calendar.start, Validators.required],
      observacion:[''],
      paciente_id:['', Validators.required],
    })
  }

  listaMedicos() {
    this.userService.getUsuariosMedicos().subscribe(data=>{
      this.users = data;
    })
  }

  listaPacientes() {
    this.pacienteService.getAll().subscribe(data=>{
      this.pacientes = data;
    })
  }

  registrar(form:any){
    this.loading = true;
    if (this.data.estado === true) {
      this.citaService
        .update(this.data.calendar.id, form)
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
              title: 'Registro Editado con exito',
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
      this.citaService
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
              title: 'Registro creado con exito',
              text: data.succes,
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data);
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
  deleteCita() {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.delete(this.data.calendar.id).subscribe( (data: any) => {
          Swal.fire(
            'Eliminado!',
            data.success,
            'success'
          )
          this.dialogRef.close(data)
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error
          });
        }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Registro no eliminado',
          'error'
          )
        }
    })
  }

  verPerfil(id:any){
    // const queryParams: { [key: string]: string | null } = {};
    // queryParams['estado'] = 'true';
    this.router.navigate(['/dashboard/pacientes/informacion',id]);
    
  }

  cambiarEstado(){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Atender!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaService.estadoEnCurso({'cita_id':this.data.calendar.id}).subscribe( (data: any) => {
          Swal.fire(
            'Exito!',
            data.success,
            'success'
          )
          this.verPerfil(this.paciente?.paciente_id)
          this.dialogRef.close(data)
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error
          });
        }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Registro no cambio de estado',
          'error'
          )
        }
    })
  }

  }


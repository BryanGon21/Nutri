import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@core/service/user.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.scss'
})
export class CrearUsuariosComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  roles: any;
  submitted = false;
  loading = false;
  trackByFn: any;
  colores=[
    {
        "clase": "fc-event-primary",
        "codigo": "#007bff",
        "nombre": "primary"
    },
    {
        "clase": "fc-event-warning",
        "codigo": "#ff9800",
        "nombre": "warning"
    },
    {
        "clase": "fc-event-success",
        "codigo": "#53b958",
        "nombre": "success"
    },
    {
        "clase": "fc-event-danger",
        "codigo": "#f9483b",
        "nombre": "danger"
    },
    {
        "clase": "fc-event-info",
        "codigo": "#03c5de",
        "nombre": "info"
    },
    {
        "clase": "fc-event-pink",
        "codigo": "#ff00e1",
        "nombre": "pink"
    },
    {
        "clase": "fc-event-green",
        "codigo": "#74eb0d",
        "nombre": "green"
    },
    {
        "clase": "fc-event-purple",
        "codigo": "#8b53b9",
        "nombre": "purple"
    },
    {
        "clase": "fc-event-gray",
        "codigo": "#878787",
        "nombre": "gray"
    },
    {
        "clase": "fc-event-yellow",
        "codigo": "#e3c70e",
        "nombre": "yellow"
    }
]

  

  constructor(
    public dialogRef: MatDialogRef<CrearUsuariosComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data:any

  ) {
    this.createForm();
  }
  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listaRoles();
    if (this.data.estado===true) {
        this.getById();
    }
  }

  getById() {
    this.userService.getById(this.data.id).subscribe(data=>{
      this.form.patchValue({
        username: data.username,
        password: '',
        email: data.email,
        nombres: data.nombres,
        apellidos: data.apellidos,
        ci: data.ci,
        celular: data.celular,
        especialidad: data.especialidad,
        rol_id: data.rol_id,
        color: data.color,
      })

    })
  }

  listaRoles() {
    this.userService.getAllRoles().subscribe((data:any)=>{
      this.roles = data;
    })
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      email: ['', [Validators.email]],
      nombres: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      apellidos: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      ci: ['',Validators.required],
      celular: ['',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('[0-9]*')
        ]
      ],
      especialidad: [''],
      rol_id:['', Validators.required],
      color: [''],
    })
  }

  registerUser(form: any) {
    this.submitted = true;
    this.loading = true;
    if (this.data.estado === true) {
      this.userService
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
              title: 'Usuario Editado con exito',
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
      this.userService
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
              title: 'Usuario creado con exito',
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
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }

}

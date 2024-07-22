import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "@core/service/user.service";
import { TokenStorageService } from "@core/authentication/token-storage.service";
import { finalize } from "rxjs";
import Swal from "sweetalert2";

@Component({
    selector: 'form-perfil',
    templateUrl: './form-perfil.component.html',
    styleUrl: './form-perfil.component.scss'
})

export class FormPerfilComponent implements OnInit {

    form!: FormGroup;
    hide = true;
    roles: any;
    submitted = false;
    loading = false;
    trackByFn: any;
    dataUser: any;
    colores = [
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
        private fb: FormBuilder,
        private userService: UserService,
        protected tokenStorage: TokenStorageService
    ) {
        this.listaRoles();
        this.createForm();
    }

    ngOnInit(): void {
        if (this.tokenStorage.getUser()) {
            this.cargarDatosCredencial(this.tokenStorage.getUser())
        }
    }

    cargarDatosCredencial(data: any): void {
        this.dataUser = data;
        this.form.patchValue({
            username: data.username,
            current_password: '',
            password: '',
            password_confirm: '',
            email: data.email,
            nombres: data.nombres,
            apellidos: data.apellidos,
            ci: data.ci,
            celular: data.celular,
            especialidad: data.especialidad,
            rol_id: data.rol_id,
            color: data.color,
        })
    }

    listaRoles() {
        this.userService.getAllRoles().subscribe((data: any) => {
            this.roles = data;
        })
    }

    createForm() {
        this.form = this.fb.group({
            username: [{ value: '', disabled: true }, Validators.required],
            current_password: [''],
            password: [''],
            password_confirm: [''],
            email: [{ value: '', disabled: true }, Validators.email],
            nombres: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
            apellidos: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
            ],
            ci: [{ value: '', disabled: true }, Validators.required],
            celular: [{ value: '', disabled: true },
                [
                    Validators.required,
                    Validators.maxLength(8),
                    Validators.pattern('[0-9]*')
                ]
            ],
            especialidad: [{ value: '', disabled: true }],
            rol_id: [{ value: '', disabled: true }, Validators.required],
            color: [{ value: '', disabled: true }],
        })
    }

    getPasswordChangePayload(): { current_password: string, password: string, password_confirm: string } {
        return {
            current_password: this.form.get('current_password')?.value,
            password: this.form.get('password')?.value,
            password_confirm: this.form.get('password_confirm')?.value,
        };
    }

    cambiarPassword(form: any) {
        this.submitted = true;
        this.loading = true;
        const passwordPayload = this.getPasswordChangePayload();
        //console.log(passwordPayload);

        if (passwordPayload.password === passwordPayload.password_confirm) {
            this.userService.cambiarPassword(passwordPayload)
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
                            title: 'Contraseña cambiado con exito',
                            text: data.succes,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.form.patchValue({
                            current_password: '',
                            password: '',
                            password_confirm: '',
                                                    
                        })
                    },
                    (error: any) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'No se pudo cambiar la contraseña',
                            text: error.error,
                        });
                        this.submitted = false;
                        this.loading = false;
                    }
                );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'La nueva contraseña no coincide con la confirmada',
                //text: error.error,
            });
            this.submitted = false;
            this.loading = false;
        }
    }
}
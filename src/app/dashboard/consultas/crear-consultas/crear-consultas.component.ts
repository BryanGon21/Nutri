import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from '@core/service/consultas.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-consultas',
  templateUrl: './crear-consultas.component.html',
  styleUrl: './crear-consultas.component.scss'
})
export class CrearConsultasComponent {

  form!: FormGroup;
  hide = true;
  submitted = false;
  loading = false;
  pacientes: any;
  @Input() paciente_id: any; 
  @Input() consulta_id: any;
  @Input() estado: any;

  @Output()data:EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private consultasService: ConsultasService,

  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getById(this.consulta_id);
    // console.log(this.consulta_id);
    
    if(this.estado!='EN CURSO'){
      this.form.disable()
    }
    
  }

  getById(id:any) {
    this.consultasService.getById(id).subscribe(data=>{
      this.form.patchValue({...data
      })

    })
  }

  createForm() {
    this.form = this.fb.group({
      paciente_id:[this.paciente_id],
      motivo:['',Validators.required],
      expectativas:['',Validators.required],
      examen_fisico:['', Validators.required],
      diagnostico:['', Validators.required],
      tratamiento:['', Validators.required],
      observacion:['', Validators.required]
    })
  }

  getById1(){
    this.data.emit()
  }

  registerConsulta(form: any) {
    this.submitted = true;
    this.loading = true;
    if (this.estado== 'EN CURSO') {
      this.consultasService
        .update(this.consulta_id, form)
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
              title: 'Consulta Editada con exito',
              showConfirmButton: false,
              timer: 1500
            });

            this.getById1();

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

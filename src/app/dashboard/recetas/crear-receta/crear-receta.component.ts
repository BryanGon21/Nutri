import { DatePipe } from '@angular/common';
import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecetasService } from '@core/service/recetas.service';
import { finalize } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TipoComidaService } from '@core/service/tipo-comida.service';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  providers:[DatePipe]
})
export class CrearRecetaComponent implements OnInit{
  isLoading=false;
  submitted=false;
  receta_id: any;
  control: any;
  receta: any
  tipocomida: any;

  form: FormGroup;
  get restricciones(): FormArray {
    return this.form.get('restricciones') as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private recetaService: RecetasService,
    private tipoComiService: TipoComidaService,
    private route:ActivatedRoute,
    private router: Router,

    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<CrearRecetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}
  ngOnInit(): void {
    this.tipoComida();
    if(this.data.estado===true){
      this.receta_id = this.data.id;
      console.log('Aqui toy>>>',this.receta_id);
      
      this.getById();
    }
    this.crearFormulario();
    this.control = <FormArray>this.form.controls['restricciones'];
  }

  crearFormulario() {
    this.form = this.fb.group({
      nombre: ['',[Validators.required]],
      calorias: ['',[Validators.required]],
      proteinas: ['',[Validators.required]],
      carbohidratos: ['',[Validators.required]],
      grasas: ['',[Validators.required]],
      ingredientes: ['',[Validators.required]],
      instrucciones: ['',[Validators.required]],
      tipo_comida_id: ['',[Validators.required]],
      restricciones:this.fb.array([]),

    });
  }
  createFormRestricciones():FormGroup{
    return this.fb.group({
      nombre:['',Validators.required],
    })
  }
  getById() {
    this.recetaService.getById(this.receta_id).subscribe(data => {
      this.tipoComiService.getById(data.tipo_comida_id).subscribe(tipoComidaData => {
        this.form.patchValue({
          nombre: data.nombre,
          calorias: data.calorias,
          proteinas: data.proteinas,
          carbohidratos: data.carbohidratos,
          grasas: data.grasas,
          ingredientes: data.ingredientes,
          instrucciones: data.instrucciones,
          tipo_comida_id: data.tipo_comida_id,
          tipo_comida_nombre: tipoComidaData.nombre,
        })
        data.restricciones.forEach((element,index) => {
          this.sumarUno();
          this.control.controls[index].patchValue({
            nombre: element.nombre,
          })
        });
      }, error => {
        console.error('Error al obtener el tipo de comida:', error);
      });
    }, error => {
      console.error('Error al obtener la receta:', error);
    });
  }
  tipoComida(){
    this.tipoComiService.getEnabledList().subscribe(data=>{
      this.tipocomida = data;
    console.log('TIPO COMIDA>>>',this.tipocomida);
    
    });
  }
  
  sumarControl(){
    this.control.push(this.createFormRestricciones());
  }
  sumarUno(){
    this.control.push(this.createFormRestricciones());
  }
  restarUno(item: any) {
    for (let i = 0; i < this.control.controls.length; i++) {
      if (item === i) {
        (<FormArray>this.form.controls['restricciones']).removeAt(i);
      }
    }
  }

  listarReceta(){
    this.recetaService.getAll().subscribe(data=>{
      this.receta = data;
    });
  
  }
    registrarReceta(form){
      this.isLoading=true;
      this.submitted=true;
  
      if (this.receta_id) {
        this.recetaService.update(this.receta_id,form)
        .pipe(
          finalize(() => {
  
            this.form.markAsPristine();
            this.isLoading=false;
          })
        )
        .subscribe(
          data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: data.success,
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data);
  
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error +' Error',
            });
          }
        );
      }else{
        this.recetaService.create(form)
        .pipe(
          finalize(() => {
  
            this.form.markAsPristine();
            this.isLoading=false;
          })
        )
        .subscribe(
          data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: data.success,
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data);
          
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error +' Error',
            });
          }
        );
      }
    }
  }
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PacientesService } from '@core/service/pacientes.service';
import { CrearPacientesComponent } from '../crear-pacientes/crear-pacientes.component';
import { InformacionMedicaComponent } from '../informacion-medica/informacion-medica.component';
import { CitasService } from '@core/service/citas.service';
import Swal from 'sweetalert2';
import { MedicionesService } from '@core/service/mediciones.service';
import { environment } from 'environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';
import { ResultadosBioquimicosComponent } from '../resultados-bioquimicos/resultados-bioquimicos.component';
import { ResultadosService } from '@core/service/resultados.service';
import { DietPlanService } from '@core/service/DietPlan.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanDietaService } from '@core/service/plandieta.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {
  paciente_id: any;
  paciente: any;
  estado: any;
  selectedOption: string = 'informacion';
  medicion: any;
  resultado: any;
  url = environment.imgUrl;

  datosFormulario: FormGroup;
  dietPlanForm: FormGroup;

  constructor(
    private pacienteService: PacientesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private citasService: CitasService,
    private mediaService: MedicionesService,
    private resultadosService: ResultadosService,
    private dietaService: DietPlanService,
    private planDietaService: PlanDietaService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {

    this.datosFormulario = this.fb.group({
      nombre: ['', Validators.required],
      edad: [0, Validators.required],
      sexo: ['Masculino', Validators.required],
      peso: [80, Validators.required],
      altura: [170, Validators.required],
      nivel_actividad: ['Moderado', Validators.required],
      circunferencia_cintura: [80, Validators.required],
      circunferencia_caderas: [90, Validators.required],
      glucosa_ayunas: [90, Validators.required],
      colesterol_total: [180, Validators.required],
      colesterol_hdl: [50, Validators.required],
      colesterol_ldl: [100, Validators.required],
      trigliceridos: [150, Validators.required],
      hemoglobina: [14, Validators.required],
      alergias_alimentarias: this.fb.array([]),
      restricciones_dieteticas: this.fb.array([]),
      preferencias_alimenticias: this.fb.array([]),
      dias: [2, Validators.required]
    });

    this.route.paramMap.subscribe(data => {
      this.paciente_id = data.get('id');
    });

    this.route.queryParams.subscribe(data => {
      this.estado = data['edit'];
    });

    this.getById();
  }

  ngOnInit() {
   
    

    this.dietPlanForm = this.fb.group({
      plans: this.fb.array([])
    });

   // this.initializeForm();
  }
  ngAfterViewInit() {
    this.obtenerDatosPaciente();
  }

  obtenerDatosPaciente() {
    const idPaciente = this.paciente_id; // Aquí debes tener la lógica para obtener el ID del paciente que deseas mostrar
    this.pacienteService.getById(idPaciente).subscribe(
      (data) => {
        // Llenar el formulario con los datos del paciente obtenidos

        console.log(data);
        let integerNumber: number = data.medicion.altura * 100;

        this.datosFormulario.patchValue({
          nombre: data.nombres+" " + data.apellidos,
          edad: data.edad,
           sexo: data.genero === 'Masculino' ? 'Masculino' : 'Femenino',
           peso: data.medicion.peso,
           altura: integerNumber,
           nivel_actividad: data.medicion.nivel_actividad,
           circunferencia_cintura: data.medicion.circunferencia_cintura,
           circunferencia_caderas: data.medicion.circunferencia_caderas,
           glucosa_ayunas: data.resultado.glucosa_ayunas,
           colesterol_total: data.resultado.colesterol_total,
           colesterol_hdl: data.resultado.colesterol_hdl ,
           colesterol_ldl: data.resultado.colesterol_ldl,
           trigliceridos: data.resultado.trigliceridos,
           hemoglobina: data.resultado.hemoglobina,
          alergias_alimentarias: this.fb.array([]),
          restricciones_dieteticas: this.fb.array([]),
          preferencias_alimenticias: this.fb.array([]),
          // otros campos aquí...
        });
      },
      (error) => {
        console.error('Error al obtener los datos del paciente:', error);
      }
    );
  }

  get plans(): FormArray {
    return this.dietPlanForm.get('plans') as FormArray;
  }

  initializeForm() {
    const initialData = [
      {
        "calorias_totales": "1060.0000000000",
        "carbohidratos_totales": "145.0000000000",
        "dia": 1,
        "grasas_totales": "36.0000000000",
        "plan_dieta": {
          "almuerzo": [
            {
              "calorias": "420.0000000000",
              "carbohidratos": "60.0000000000",
              "created_at": "Thu, 23 May 2024 16:42:59 GMT",
              "grasas": "14.0000000000",
              "habilitado": 1,
              "id": 12,
              "ingredientes": "Quinoa, Vegetales, Aceite de Oliva",
              "instrucciones": "Cocinar la quinoa y mezclar con vegetales y aceite de oliva.",
              "nombre": "Ensalada de Quinoa",
              "proteinas": "12.0000000000",
              "tipo_comida_id": 2,
              "updated_at": "Thu, 23 May 2024 16:42:59 GMT"
            }
          ],
          "cena": [
            {
              "calorias": "340.0000000000",
              "carbohidratos": "40.0000000000",
              "created_at": "Thu, 23 May 2024 16:42:59 GMT",
              "grasas": "12.0000000000",
              "habilitado": 1,
              "id": 28,
              "ingredientes": "Garbanzos, Tomate, Cebolla, Aceite de Oliva",
              "instrucciones": "Cocinar los garbanzos con tomate y cebolla.",
              "nombre": "Cenas de Garbanzos",
              "proteinas": "14.0000000000",
              "tipo_comida_id": 3,
              "updated_at": "Thu, 23 May 2024 16:42:59 GMT"
            }
          ],
          "desayuno": [
            {
              "calorias": "300.0000000000",
              "carbohidratos": "45.0000000000",
              "created_at": "Thu, 23 May 2024 16:42:59 GMT",
              "grasas": "10.0000000000",
              "habilitado": 1,
              "id": 1,
              "ingredientes": "Avena, Leche, Plátano, Miel",
              "instrucciones": "Mezclar los ingredientes y servir frío.",
              "nombre": "Desayuno Energético",
              "proteinas": "15.5000000000",
              "tipo_comida_id": 1,
              "updated_at": "Thu, 23 May 2024 16:42:59 GMT"
            }
          ]
        },
        "proteinas_totales": "41.5000000000"
      },
      {
        "calorias_totales": "980.0000000000",
        "carbohidratos_totales": "125.0000000000",
        "dia": 2,
        "grasas_totales": "32.0000000000",
        "plan_dieta": {
          "almuerzo": [
            {
              "calorias": "420.0000000000",
              "carbohidratos": "50.0000000000",
              "created_at": "Thu, 23 May 2024 16:42:59 GMT",
              "grasas": "15.0000000000",
              "habilitado": 1,
              "id": 20,
              "ingredientes": "Garbanzos, Tomate, Leche de Coco, Especias",
              "instrucciones": "Cocinar los garbanzos con tomate, leche de coco y especias.",
              "nombre": "Curry de Garbanzos",
              "proteinas": "14.0000000000",
              "tipo_comida_id": 2,
              "updated_at": "Thu, 23 May 2024 16:42:59 GMT"
            }
          ],
          "cena": [
            {
              "calorias": "340.0000000000",
              "carbohidratos": "40.0000000000",
              "created_at": "Thu, 23 May 2024 16:42:59 GMT",
              "grasas": "12.0000000000",
              "habilitado": 1,
              "id": 28,
              "ingredientes": "Garbanzos, Tomate, Cebolla, Aceite de Oliva",
              "instrucciones": "Cocinar los garbanzos con tomate y cebolla.",
              "nombre": "Cenas de Garbanzos",
              "proteinas": "14.0000000000",
              "tipo_comida_id": 3,
              "updated_at": "Thu, 23 May 2024 16:42:59 GMT"
            }
          ],
          "desayuno": [
            {
              "calorias": "220.0000000000",
              "carbohidratos": "35.0000000000",
              "created_at": "Thu, 23 May 2024 16:42:59 GMT",
              "grasas": "5.0000000000",
              "habilitado": 1,
              "id": 5,
              "ingredientes": "Yogur, Granola, Frutas",
              "instrucciones": "Mezclar el yogur con la granola y frutas.",
              "nombre": "Yogur con Granola",
              "proteinas": "10.0000000000",
              "tipo_comida_id": 1,
              "updated_at": "Thu, 23 May 2024 16:42:59 GMT"
            }
          ]
        },
        "proteinas_totales": "38.0000000000"
      }
    ];

    initialData.forEach(plan => {
      this.plans.push(this.createPlanGroup(plan));
    });
  }

  createPlanGroup(plan: any): FormGroup {
    return this.fb.group({
      calorias_totales: [plan.calorias_totales, Validators.required],
      carbohidratos_totales: [plan.carbohidratos_totales, Validators.required],
      dia: [plan.dia, Validators.required],
      grasas_totales: [plan.grasas_totales, Validators.required],
      plan_dieta: this.fb.group({
        desayuno: this.createMealArray(plan.plan_dieta?.desayuno || []),
        almuerzo: this.createMealArray(plan.plan_dieta?.almuerzo || []),
        cena: this.createMealArray(plan.plan_dieta?.cena || [])
      }),
      proteinas_totales: [plan.proteinas_totales, Validators.required]
    });
  }

  createMealArray(meals: any[]): FormArray {
    const mealArray = new FormArray([]);
    meals.forEach(meal => {
      mealArray.push(this.createMealGroup(meal));
    });
    return mealArray;
  }

  createMealGroup(meal): FormGroup {
    return this.fb.group({
      calorias: [meal.calorias, Validators.required],
      carbohidratos: [meal.carbohidratos, Validators.required],
      grasas: [meal.grasas, Validators.required],
      habilitado: [meal.habilitado, Validators.required],
      id: [meal.id, Validators.required],
      ingredientes: [meal.ingredientes, Validators.required],
      instrucciones: [meal.instrucciones, Validators.required],
      nombre: [meal.nombre, Validators.required],
      proteinas: [meal.proteinas, Validators.required],
      tipo_comida_id: [meal.tipo_comida_id, Validators.required]
    });
  }

  agregarPlan(): void {
    this.plans.push(this.createPlanGroup({
      calorias_totales: '',
      carbohidratos_totales: '',
      dia: this.plans.length + 1,
      grasas_totales: '',
      plan_dieta: {
        desayuno: [],
        almuerzo: [],
        cena: []
      },
      proteinas_totales: ''
    }));
  }

  eliminarPlan(index: number): void {
    this.plans.removeAt(index);
  }

  agregarComida(planIndex: number, tipoComida: string): void {
    const meals = this.plans.at(planIndex).get(`plan_dieta.${tipoComida}`) as FormArray;
    meals.push(this.createMealGroup({
      calorias: '',
      carbohidratos: '',
      grasas: '',
      habilitado: 1,
      id: null,
      ingredientes: '',
      instrucciones: '',
      nombre: '',
      proteinas: '',
      tipo_comida_id: tipoComida === 'desayuno' ? 1 : tipoComida === 'almuerzo' ? 2 : 3
    }));
  }

  eliminarComida(planIndex: number, tipoComida: string, mealIndex: number): void {
    const meals = this.plans.at(planIndex).get(`plan_dieta.${tipoComida}`) as FormArray;
    meals.removeAt(mealIndex);
  }

  get alergiasAlimentarias(): FormArray {
    return this.datosFormulario.get('alergias_alimentarias') as FormArray;
  }

  get restriccionesDieteticas(): FormArray {
    return this.datosFormulario.get('restricciones_dieteticas') as FormArray;
  }

  get preferenciasAlimenticias(): FormArray {
    return this.datosFormulario.get('preferencias_alimenticias') as FormArray;
  }

  agregarAlergia(): void {
    this.alergiasAlimentarias.push(this.fb.control(''));
  }

  eliminarAlergia(indice: number): void {
    this.alergiasAlimentarias.removeAt(indice);
  }

  agregarRestriccion(): void {
    this.restriccionesDieteticas.push(this.fb.control(''));
  }

  eliminarRestriccion(indice: number): void {
    this.restriccionesDieteticas.removeAt(indice);
  }

  agregarPreferencia(): void {
    this.preferenciasAlimenticias.push(this.fb.control(''));
  }

  eliminarPreferencia(indice: number): void {
    this.preferenciasAlimenticias.removeAt(indice);
  }

  inicializarArray(nombreArray: string, valores: string[]): void {
    const formArray = this.datosFormulario.get(nombreArray) as FormArray;
    valores.forEach(valor => formArray.push(this.fb.control(valor)));
  }

  enviarDatos(): void {
    if (this.datosFormulario.valid) {
      this.dietaService.generateDietPlan(this.datosFormulario.value).subscribe(
        response => {
          response.forEach(plan => {
            this.plans.push(this.createPlanGroup(plan));
          });
          console.log('Respuesta del servidor:', response);
        },
        error => {
          console.error('Error al enviar la solicitud:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  guardarPlan(): void {
    const datosPersonales = this.datosFormulario.value;
    const dietas = this.dietPlanForm.value.plans; // Asegurarse de usar 'plans' en lugar de 'dietas'

    const jsonPayload = {
      ...datosPersonales,
      paciente_id: this.paciente_id,  // Asignar el ID del paciente si es necesario
      dietas: dietas.map(dieta => ({
        dia: dieta.dia,
        calorias_totales: dieta.calorias_totales,
        carbohidratos_totales: dieta.carbohidratos_totales,
        grasas_totales: dieta.grasas_totales,
        plan_dietas: [
          ...dieta.plan_dieta.desayuno,
          ...dieta.plan_dieta.almuerzo,
          ...dieta.plan_dieta.cena
        ].map(comida => ({
          tipo_comida_id: comida.tipo_comida_id,
          nombre: comida.nombre,
          calorias: comida.calorias,
          proteinas: comida.proteinas,
          carbohidratos: comida.carbohidratos,
          grasas: comida.grasas,
          ingredientes: comida.ingredientes,
          instrucciones: comida.instrucciones
        }))
      }))
    };

    console.log(jsonPayload);

    this.planDietaService.create(jsonPayload).subscribe(
      response => {
        console.log('Plan de dieta guardado exitosamente', response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El plan de dieta fue creado exitosamene!!!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        console.error('Error al guardar el plan de dieta', error);
      }
    );
  }

  getById() {
    this.pacienteService.getById(this.paciente_id).subscribe(data => {
      this.paciente = data;
      this.medicion = data.medicion;
      this.resultado = data.resultado;
    });
  }

  editar() {
    const dialogRef = this.dialog.open(CrearPacientesComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: this.paciente_id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getById();
      }
    });
  }

  crearMedicion() {
    const dialogRef = this.dialog.open(InformacionMedicaComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro',
        paciente_id: this.paciente_id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getById();
      }
    });
  }

  crearResultado() {
    const dialogRef = this.dialog.open(ResultadosBioquimicosComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro',
        paciente_id: this.paciente_id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getById();
      }
    });
  }

  editarMedicion(id: any) {
    const dialogRef = this.dialog.open(InformacionMedicaComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        paciente_id: this.paciente_id,
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getById();
      }
    });
  }

  editarResultado(id: any) {
    const dialogRef = this.dialog.open(ResultadosBioquimicosComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        paciente_id: this.paciente_id,
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getById();
      }
    });
  }

  getByIdMedicion(id: any) {
    this.mediaService.getById(id).subscribe(data => {
      this.medicion = data;
    });
  }

  getByIdResultado(id: any) {
    this.resultadosService.getById(id).subscribe(data => {
      this.resultado = data;
    });
  }

  getPDF() {
    this.pacienteService.getPDF(this.paciente_id).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ImprimirPdfComponent, { size: 'lg' });
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result: any) => {
        if (result) {

        }
      });
    });
  }

  terminarCita() {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirse!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Concluir Cita!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.citasService.estadoTerminado({ 'cita_id': this.paciente?.informacion?.cita?.id }).subscribe((data: any) => {
          Swal.fire(
            'Éxito!',
            data.success,
            'success'
          );
          this.getById();
        },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un problema',
              text: error.error
            });
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Registro no cambió de estado',
          'error'
        );
      }
    });
  }
}

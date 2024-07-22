import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { pacientesRoutingModule } from './pacientes-routing.module';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CrearPacientesComponent } from './crear-pacientes/crear-pacientes.component';
import { InformacionMedicaComponent } from './informacion-medica/informacion-medica.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ConsultasModule } from '../consultas/consultas.module';
import { FormDialogComponent } from 'app/calendar/dialogs/form-dialog/form-dialog.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { ResultadosBioquimicosComponent } from './resultados-bioquimicos/resultados-bioquimicos.component';



@NgModule({
  declarations: [
    ListarPacientesComponent,
    CrearPacientesComponent,
    InformacionMedicaComponent,
    DatosPersonalesComponent,
    ResultadosBioquimicosComponent,
    InformacionComponent
  ],
  imports: [
    CommonModule,
    pacientesRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    ConsultasModule,
    FormDialogComponent,
    FileUploadComponent
  ],
  providers:[
    DatePipe
  ]
})
export class PacientesModule { }

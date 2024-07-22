import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ConsultasModule } from '../consultas/consultas.module';
import { FormDialogComponent } from 'app/calendar/dialogs/form-dialog/form-dialog.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CitaPacienteRoutingModule } from './cita-paciente-routing.module';
import { ListarCitasComponent } from './listar-citas/listar-citas.component';



@NgModule({
  declarations: [
    ListarCitasComponent,
    // CrearCitaComponent

  ],
  imports: [
    CommonModule,
    CitaPacienteRoutingModule,
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
export class CitaPacienteModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ConsultasModule } from '../consultas/consultas.module';
import { FormDialogComponent } from 'app/calendar/dialogs/form-dialog/form-dialog.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { DietaPacienteRoutingModule } from './dieta-dieta-routing.module';
import { ListarDietasComponent } from './listar-dietas/listar-dietas.component';
import { DetalleDietasComponent } from './detalle-dietas/detalle-dietas.component';



@NgModule({
  declarations: [
    ListarDietasComponent,
    DetalleDietasComponent,
    // CrearCitaComponent

  ],
  imports: [
    CommonModule,
    DietaPacienteRoutingModule,
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
export class DietaPacienteModule { }

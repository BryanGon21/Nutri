import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecetasRoutingModule } from './recetas-routing.module';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ConsultasModule } from '../consultas/consultas.module';
import { FormDialogComponent } from 'app/calendar/dialogs/form-dialog/form-dialog.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { ListarRecetaComponent } from './listar-receta/listar-receta.component';
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';



@NgModule({
  declarations: [
    ListarRecetaComponent,
    CrearRecetaComponent

  ],
  imports: [
    CommonModule,
    RecetasRoutingModule,
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
export class RecetasModule { }

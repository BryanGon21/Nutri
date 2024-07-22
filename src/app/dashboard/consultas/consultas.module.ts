import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { CrearConsultasComponent } from './crear-consultas/crear-consultas.component';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    CrearConsultasComponent,
    ListarConsultasComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent
  ],
  exports:[
    CrearConsultasComponent
  ]
})
export class ConsultasModule { }

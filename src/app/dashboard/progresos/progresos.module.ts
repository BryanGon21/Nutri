import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { progresosRoutingModule } from './progresos-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { ListaProgresosComponent } from './lista-progresos/lista-progresos.component';



@NgModule({
  declarations: [
    ListaProgresosComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    progresosRoutingModule
  ]
})
export class ProgresosModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListaProgresosComponent } from './lista-progresos/lista-progresos.component';


const routes: Routes = [
  {
    path:'',
    component: ListaProgresosComponent,
    canActivate:[AuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class progresosRoutingModule { }

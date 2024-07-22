import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarConsultasComponent } from './listar-consultas/listar-consultas.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path:'lista/:id',
    component: ListarConsultasComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarCitasComponent } from './listar-citas/listar-citas.component';

const routes: Routes = [
  {
    path:'',
    component: ListarCitasComponent,
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitaPacienteRoutingModule { }

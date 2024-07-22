import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { CrearPacientesComponent } from './crear-pacientes/crear-pacientes.component';
import { InformacionComponent } from './informacion/informacion.component';
import { ProgresoComponent } from './progreso/progreso.component';

const routes: Routes = [
  {
    path:'',
    component: ListarPacientesComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'informacion/:id',
    component: InformacionComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'progreso',
    component: ProgresoComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pacientesRoutingModule { }

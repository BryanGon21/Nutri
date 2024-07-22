import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarDietasComponent } from './listar-dietas/listar-dietas.component';
import { DetalleDietasComponent } from './detalle-dietas/detalle-dietas.component';

const routes: Routes = [
  {
    path:'',
    component: ListarDietasComponent,
    canActivate:[AuthGuard]
  },
  {
    path:':id',
    component: ListarDietasComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'plan/:id',
    component: DetalleDietasComponent,
    canActivate:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietaPacienteRoutingModule { }

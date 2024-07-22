import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ListarRecetaComponent } from './listar-receta/listar-receta.component';
import { CrearRecetaComponent } from './crear-receta/crear-receta.component';

const routes: Routes = [
  {
    path:'',
    component: ListarRecetaComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'editar:id',
    component: CrearRecetaComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecetasRoutingModule { }

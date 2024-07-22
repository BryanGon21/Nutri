import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@core/guard/auth.guard";

//Components
import { FormPerfilComponent } from "./form-perfil/form-perfil.component";

const routes: Routes = [
    {
        path: '',
        component: FormPerfilComponent,
        canActivate: [AuthGuard]
    }    
];  

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PerilRoutingModule { }
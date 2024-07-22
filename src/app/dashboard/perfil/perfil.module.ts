import { NgModule } from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";

import { PerilRoutingModule } from "./perfil-routing.module";
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

//Componentes 
import { FormPerfilComponent } from "./form-perfil/form-perfil.component";

@NgModule({
    declarations: [
        FormPerfilComponent
    ],
    imports: [
        CommonModule,
        PerilRoutingModule,
        WebMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BreadcrumbComponent,
        NgClass
    ]
})

export class PerfilModule { }
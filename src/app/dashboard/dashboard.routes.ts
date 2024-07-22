import { Route } from "@angular/router";
import { Page404Component } from "../authentication/page404/page404.component";
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { ProgresopacComponent } from "./progresopac/progresopac.component";


export const DASHBOARD_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "dashboard1",
    pathMatch: "full",
  },
  {
    path: "dashboard1",
    component: Dashboard1Component,
  },
  {
    path: "dashboard2",
    component: Dashboard2Component,
  },
  { path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  { 
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)
  },
  { path: 'recetas',
    loadChildren: () => import('./recetas/recetas.module').then(m => m.RecetasModule)
  },
  { path: 'pacientes',
  loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule)
  },
  { path: 'consultas',
  loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule)
  },
  { path: 'citas',
  loadChildren: () => import('./cita-paciente/cita-paciente.module').then(m => m.CitaPacienteModule)
  },
  { path: 'dietas',
  loadChildren: () => import('./dieta-paciente/dieta-paciente.module').then(m => m.DietaPacienteModule)
  },
  { path: 'progreso',
  loadChildren: () => import('./progresos/progresos.module').then(m => m.ProgresosModule)
  },

  { path: "**", component: Page404Component },
];


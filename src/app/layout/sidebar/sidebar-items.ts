import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Principal',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'dashboard/usuarios',
    title: 'Usuarios',
    iconType: 'feather',
    icon: 'user',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles:['administrador']
  },
  {
    path: 'dashboard/recetas',
    title: 'Recetas',
    iconType: 'feather',
    icon: 'file-text',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles:['medico']
  },
  {
    path: 'dashboard/pacientes',
    title: 'Pacientes',
    iconType: 'feather',
    icon: 'users',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles:['medico']
  },
  {
    path: 'calendar',
    title: 'Calendario de citas',
    iconType: 'feather',
    icon: 'calendar',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles:['medico']
  },
  {
    path: 'dashboard/citas',
    title: 'Citas',
    iconType: 'feather',
    icon: 'calendar',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles:['paciente']
  },
  {
    path: 'dashboard/dietas',
    title: 'Dietas',
    iconType: 'feather',
    icon: 'calendar',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles:['paciente']
  },
  {
    path: 'dashboard/progreso',
    title: 'Progreso',
    iconType: 'feather',
    icon: 'calendar',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles:['paciente']
  },
  

];

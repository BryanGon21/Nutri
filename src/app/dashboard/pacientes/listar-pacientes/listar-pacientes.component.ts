import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PacientesService } from '@core/service/pacientes.service';
import { CrearPacientesComponent } from '../crear-pacientes/crear-pacientes.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrl: './listar-pacientes.component.scss'
})
export class ListarPacientesComponent implements OnInit {
  nombreColumna: string[]=[
    'Nº',
    'Imagen',
    'Nombre',
    'Apellido',
    'FechaNacimiento',
    'Celular',
    'Direccion',
    'Email',
    'Genero',
    'Acciones',
  ];
paginado!: MatTableDataSource<any>;

@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
url=environment.imgUrl;

constructor(private pacientesService: PacientesService,
  private dialog: MatDialog,
  private router: Router,

  ){

  }

  ngOnInit(): void {
    this.listaPacientes();
  }
  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
  listaPacientes() {
    this.pacientesService.getAll().subscribe(data=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    })
  }
  crear(){
    const dialogRef = this.dialog.open(CrearPacientesComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaPacientes()
      }
    });
  }
  editar(id:any){
    const dialogRef = this.dialog.open(CrearPacientesComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaPacientes()
      }
    });
  }

  verPerfil(id:any){
    const queryParams: { [key: string]: string | null } = {};
    queryParams['edit'] = 'true';
    this.router.navigate(['/dashboard/pacientes/informacion',id], { queryParams });
    
  }

  verDieta(id:any){
    this.router.navigate(['/dashboard/dietas',id]);
  }

  deletePaciente(id: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacientesService.delete(id).subscribe( (data: any) => {
          Swal.fire(
            'Eliminado!',
            'Usuario eliminado.',
            'success'
          )
          this.listaPacientes();
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrio un problema',
            text: error.error
          });
        }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Registro no eliminado',
          'error'
          )
        }
    })
  }

  }

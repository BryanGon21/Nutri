import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecetasService } from '@core/service/recetas.service';
import { CrearRecetaComponent } from '../crear-receta/crear-receta.component';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-listar-receta',
  templateUrl: './listar-receta.component.html',
})
export class ListarRecetaComponent implements OnInit {
  recetas : any;
  nombreColumna: string[]=[
    'Nº',
    'Nombre',
    'Calorias',
    'Proteinas',
    'Carbohidratos',
    'Grasas',
    'Ingredientes',
    // 'Instrucciones',
    // 'Restricciones',
    'Acciones'
  ];
paginado!: MatTableDataSource<any>;
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  constructor(
    private recetasService: RecetasService,
    private dialog: MatDialog,
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
    this.listaRecetas();
  }
  listaRecetas() {
    this.recetasService.getAll().subscribe(data=>{
      this.recetas = data;
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    console.log(this.recetas,'Listar Recetas');
    })
  }
  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
  crear(){
    const dialogRef = this.dialog.open(CrearRecetaComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.listaRecetas();
      }
    });
  }
  editModal(id: any){
    console.log('ID::::',id);
    const dialogRef = this.dialog.open(CrearRecetaComponent,{
        data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaRecetas()
      }
    });
  }
  delete(id: string){
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
        this.recetasService.delete(id).subscribe( (data: any) => {
          console.log(data);
          this.listaRecetas();
          Swal.fire(
            'Eliminado!',
            'Receta eliminada.',
            'success'
          )
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!'
          });
        }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'La receta esta no se eliminó.',
          'error'
          )
        }
    })
  }
}

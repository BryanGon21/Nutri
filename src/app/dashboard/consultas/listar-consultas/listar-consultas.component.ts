import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultasService } from '@core/service/consultas.service';
import { CrearConsultasComponent } from '../crear-consultas/crear-consultas.component';
import Swal from 'sweetalert2';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PacientesService } from '@core/service/pacientes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImprimirPdfComponent } from '@shared/components/imprimir-pdf/imprimir-pdf.component';

@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrl: './listar-consultas.component.scss'
})
export class ListarConsultasComponent implements OnInit{
  nombreColumnas: string[]=[
    'Nº',
    'Motivo',
    'ExamenFisico',
    'Diagnostico',
    'Observacion',
    'Acciones',
  ];
paginado!: MatTableDataSource<any>;

@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  paciente_id: any;

constructor(private consultasService: ConsultasService,
  private dialog: MatDialog,
  private router: ActivatedRoute,
  private pacienteService: PacientesService,
  private modalService: NgbModal

  ){

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(data=>{
      this.paciente_id = data.get('id');
    })

    this.listaConsultas(this.paciente_id);
  }

  getPDF(){
    this.pacienteService.getPDF(this.paciente_id).subscribe((res: any) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(ImprimirPdfComponent, {size:'lg'});
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Vista previa del Reporte';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then((result: any) => {
        if (result) {
          this.listaConsultas(this.paciente_id);
        }
      });
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
  listaConsultas(id:any) {
    this.consultasService.consulta_paciente(id).subscribe(data=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;
    })
  }
  create(){
    const dialogRef = this.dialog.open(CrearConsultasComponent, {
      data: {
        estado: false,
        title: 'Nueva Consulta',
        paciente_id:this.paciente_id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
    this.listaConsultas(this.paciente_id);
      }
    });
  }
  editar(id:any){
    const dialogRef = this.dialog.open(CrearConsultasComponent, {
      data: {
        estado: true,
        title: 'Editar Consulta',
        id: id,
        paciente_id:this.paciente_id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
    this.listaConsultas(this.paciente_id);
      }
    });
  }
  deleteConsulta(id: any) {
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
        this.consultasService.delete(id).subscribe( (data: any) => {
          Swal.fire(
            'Eliminado!',
            'Usuario eliminado.',
            'success'
          )
          this.listaConsultas(this.paciente_id);
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

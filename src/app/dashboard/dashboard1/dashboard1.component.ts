import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexTooltip, ApexYAxis, ApexPlotOptions, ApexStroke, ApexLegend, ApexFill, ApexMarkers, ApexGrid, ApexTitleSubtitle, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterLink } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { FeatherIconsComponent } from '../../shared/components/feather-icons/feather-icons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { CitasService } from '@core/service/citas.service';
import Swal from 'sweetalert2';
import { HasRolesDirective } from 'app/layout/has-roles.directive';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'app/calendar/dialogs/form-dialog/form-dialog.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'environments/environment';
@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss'],
    standalone: true,
    imports: [
        BreadcrumbComponent,
        WebMaterialModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        FeatherIconsComponent,
        NgApexchartsModule,
        NgScrollbar,
        RouterLink,
        MatProgressBarModule,
        MatCheckboxModule,
        MatTooltipModule,
        NgClass,
        CommonModule,
        HasRolesDirective,
    ],
})
export class Dashboard1Component implements OnInit {
  public areaChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public earningOptions!: Partial<ChartOptions>;
  public performanceRateChartOptions!: Partial<ChartOptions>;
dato: any;
  url=environment.imgUrl
  constructor(
    private citasService: CitasService,
    private router: Router,
    private dialog: MatDialog,
  
  ) {
    //constructor
  }
  ngOnInit() {
    this.citas_medico();
  }

  citas_medico(filter?:any) {
    this.citasService.citas_medico().subscribe(data=>{
      this.dato = data
    })
  }

  cambiarEstado(id:any,paciente_id:any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Atender!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.citasService.estadoEnCurso({'cita_id':id}).subscribe( (data: any) => {
          Swal.fire(
            'Exito!',
            data.success,
            'success'
          )
          this.verPerfil(paciente_id)
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
          'Registro no cambio de estado',
          'error'
          )
        }
    })
  }

  verPerfil(id:any){
    // const queryParams: { [key: string]: string | null } = {};
    // queryParams['estado'] = 'true';
    this.router.navigate(['/dashboard/pacientes/informacion',id]);
    
  }

  eventClick(row: any) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: row,
        title: 'Editar Cita',
        estado:true
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.citas_medico();
      }
    });
  }

  deleteCita(id:any) {
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
        this.citasService.delete(id).subscribe( (data: any) => {
          Swal.fire(
            'Eliminado!',
            data.success,
            'success'
          )
          this.citas_medico();
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
 
  terminarCita(id:any){
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Concluir Cita!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.citasService.estadoTerminado({'cita_id':id}).subscribe( (data: any) => {
          Swal.fire(
            'Exito!',
            data.success,
            'success'
          )
          this.citas_medico();
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
          'Registro no cambio de estado',
          'error'
          )
        }
    })
  } 

}

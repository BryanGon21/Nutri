import { Component } from '@angular/core';
import { MedicionesService } from '@core/service/mediciones.service';
import { ChartData, ChartOptions } from 'chart.js';;
import * as moment from 'moment';

@Component({
  selector: 'app-lista-progresos',
  templateUrl: './lista-progresos.component.html',
  styleUrl: './lista-progresos.component.scss'
})
export class ListaProgresosComponent {

  progreso: any;
  /**
   *
   */

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Progreso de Peso',
        borderColor: '#42A5F5',
        fill: false
      }
    ]
  };
  public lineChartDataAltura: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Progreso de Altura',
        borderColor: '#42A5F5',
        fill: false
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  constructor(private progresoService:MedicionesService) {
    this.obtenerProgresoPeso(1, 'peso');
    this.obtenerProgresoAltura(1, 'altura');
  }

  obtenerProgresoPeso(id: any, tipo: string): void {
    this.progresoService.getProgreso(id, tipo).subscribe(
      data => {
        this.progreso = data;
        data.labels = transformDates(data.labels);
        this.lineChartData.labels = data.labels;
        this.lineChartData.datasets[0].data = data.data.map(Number);
      },
      error => {
        console.error('Error al obtener el progreso peso', error);
      }
    );
  }
  obtenerProgresoAltura(id: any, tipo: string): void {
    this.progresoService.getProgreso(id, tipo).subscribe(
      data => {
        this.progreso = data;
        data.labels = transformDates(data.labels);
        this.lineChartDataAltura.labels = data.labels;
        this.lineChartDataAltura.datasets[0].data = data.data.map(Number);
      },
      error => {
        console.error('Error al obtener el progreso altura', error);
      }
    );
  }

}
// Función para transformar las fechas
const transformDates = (dates: string[]): string[] => {
  return dates.map(date => {
      return moment(date, 'YYYY-MM-DD HH:mm:ss').format('D MMM YY'); // 5 Jun 24
  });
};

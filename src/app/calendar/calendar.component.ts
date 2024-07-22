import { Component, ViewChild, OnInit, Renderer2, Inject } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { INITIAL_EVENTS } from './events-util';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Direction } from '@angular/cdk/bidi';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { CitasService } from '@core/service/citas.service';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { color } from 'echarts';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatButtonModule,
    MatCheckboxModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDialogModule,
    MatIconModule
  ],
})
export class CalendarComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  @ViewChild('calendar', { static: false })
  calendarEvents?: EventInput[];
  tempEvents?: EventInput[];

  public filters = [
    { name: 'EN ESPERA', value: 'EN ESPERA', color: '#ff9800' },
    { name: 'EN CURSO', value: 'EN CURSO', color: '#03c5de' },
    { name: 'TERMINADO', value: 'TERMINADO', color: '#53b958' },
    { name: 'CANCELADA', value: 'CANCELADA', color: '#f9483b' },
  ];
  public calendar: any;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private citasService: CitasService,
  ) {
    super();

  }
  setStyle(s,v) {
    document.documentElement.style.setProperty(s, v);
  }


  public ngOnInit(): void {
    this.listaCitas();



  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDateSelect(selectInfo: DateSelectArg) {
    this.addNewEvent(selectInfo);
  }

  listaCitas(){
    this.citasService.getAll().subscribe(data=>{
      this.calendar = data.length;
      
      
      this.calendarEvents = []
      data.forEach((element,index) => {

        this.setStyle('--rows', element.medico.color);

        this.calendarEvents = this.calendarEvents.concat({
        id: element.id,
        title: element.titulo,
        start: new Date( element.fecha_inicio),
        end: new Date( element.fecha_fin),
        className : element.estado=='EN ESPERA'?'fc-event-warning':element.estado=='EN CURSO'?'fc-event-info':element.estado=='CANCELADA'?'fc-event-danger':'fc-event-success',
        groupId: element.user_id,
      });
    });
      this.calendarOptions.events = this.calendarEvents;

    })
  }

  addNewEvent(row:DateSelectArg) {

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: row,
        title: 'Nueva Cita',
      },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaCitas();
      }
    });
  }



  handleEventClick(clickInfo: EventClickArg) {
    this.eventClick(clickInfo);

  }

  eventClick(row: EventClickArg) {
    const calendarData = {
      id: row.event.id,
      titulo: row.event.title,
      fecha_inicio: row.event.start,
      fecha_fin: row.event.end,
    };
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        calendar: calendarData,
        title: 'Editar Cita',
        estado:true
      },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaCitas();
      }
    });
  }

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}

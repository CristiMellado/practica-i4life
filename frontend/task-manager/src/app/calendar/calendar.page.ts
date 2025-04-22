import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core'; // Importar CalendarOptions
import {TaskService} from '../services/task.service'; //Importo el servicio de mi tareas

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: false,
})
export class CalendarPage implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth', // Establecer vista inicial (mes)
    events: [],
  };

  constructor(private taskService:TaskService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.taskService.getTasks().subscribe(tasks => {
      const calendarEvents = tasks.map(task => ({
        title: task.title,
      }));

      // Asignar eventos dinámicamente
      this.calendarOptions.events = calendarEvents;
    });
  }

  }



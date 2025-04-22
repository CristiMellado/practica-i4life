import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core'; // Importar CalendarOptions

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
    events: [
      { title: 'Evento 1', date: '2025-04-21' },
      { title: 'Evento 2', date: '2025-04-22' },
    ],
  };

  constructor() {}

  ngOnInit() {}
}

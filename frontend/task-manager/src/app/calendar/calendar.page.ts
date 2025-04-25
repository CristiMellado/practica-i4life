import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: false,
})

export class CalendarPage implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth', // Vista inicial (mes)
    events: [], // Array de eventos (vacío al inicio)
    eventContent: (arg) => {
      const user = arg.event.extendedProps['user']; // Accedemos con 'user' entre corchetes
      return {
        html: `
          <div style="background-color: #ccafc0; padding: 5px; border-radius: 5px;">
            <b>${arg.event.title}</b><br>
            <span style="font-size: smaller; color: white;">Responsable: ${user}</span>
          </div>
        `
      };
    },
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadEvents(); // Llamamos a este método para cargar los eventos al inicio
  }

  loadEvents() {
    // Cargar las tareas del servicio
    this.taskService.getTasks().subscribe(tasks => {
      // Filtra las tareas que tengan una fecha válida
      const calendarEvents = tasks
        .filter(task => task.dueDate) // Filtra tareas que tienen fecha
        .map(task => {
          const dueDate = task.dueDate ? new Date(task.dueDate) : null;
          
          if (dueDate) {
            // Crea el evento con título, usuario y fecha
            return {
              title: task.title,
              user: task.userId?.username, // Asigna el 'username' del usuario
              date: dueDate.toISOString().split('T')[0], // Solo la fecha (sin hora)
            };
          } else {
            return null; // Si no tiene fecha, lo omite
          }
        })
        .filter(event => event !== null); // Filtra eventos nulos

      console.log('Eventos generados para el calendario:', calendarEvents);
      
      if (calendarEvents.length > 0) {
        // Si hay eventos, actualiza los eventos del calendario
        this.calendarOptions.events = calendarEvents;

        // Si tienes acceso al calendario (ej. usando ViewChild), puedes actualizarlo
        // Aquí estamos solo actualizando los eventos, manteniendo el resto de configuraciones
        console.log('Eventos actualizados:', calendarEvents);

        // Si deseas mantener la personalización del contenido del evento, se mantiene aquí
        this.calendarOptions.eventContent = (arg) => {
          const user = arg.event.extendedProps['user'];  // Accedemos con 'user' entre corchetes
          return {
            html: `
              <div style="background-color: #2d12a5; padding: 5px; border-radius: 5px;">
                <b>${arg.event.title}</b><br>
                <span style="font-size: smaller; color: white;">Responsable: ${user}</span>
              </div>
            `
          };
        };

      } else {
        console.warn('No hay eventos válidos para mostrar.');
      }
    });
  }
}

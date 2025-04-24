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
    this.loadEvents(); //cargo aquí los eventos
  }

  loadEvents() {
    this.taskService.getTasks().subscribe(tasks => {
  
      const calendarEvents = tasks
        .filter(task => task.dueDate) // Solo tareas con fecha
        .map(task => {
          // Asegúrate de usar la fecha límite de la tarea que seleccionó el usuario
          const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  
          if (dueDate) {
            console.log('Tarea:', task.title, 'Fecha límite:', dueDate); // Verifica la fecha límite
  
        
            return {
              title: task.title,
              date: dueDate.toISOString().split('T')[0],  
            };
          } else {
            console.warn('No se encuentra fecha válida para la tarea:', task.title);
            return null; // Si no tiene fecha, no se incluye en el calendario
          }
        })
        .filter(event => event !== null); // Filtrar eventos nulos
  
      console.log('Eventos generados para el calendario:', calendarEvents); // Verifica los eventos generados
  
      if (calendarEvents.length > 0) {
        this.calendarOptions = {
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          events: calendarEvents, // Actualiza los eventos
        };
      } else {
        console.warn('No hay eventos válidos para mostrar.');
      }
    });
  }
  
  

  }



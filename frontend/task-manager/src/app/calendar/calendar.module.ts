import { NgModule } from '@angular/core';
/*modulo que da acceso a funcionalidades básicas de angular
ejemplo: (ngIf,ngFor, ngClass)*/ 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
/*Modulo que me da acceso a todos los componentes y funcionalidades
de ionic*/ 
import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    FullCalendarModule,
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}

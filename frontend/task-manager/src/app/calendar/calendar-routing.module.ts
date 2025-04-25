import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; //modulos de Angular
import { CalendarPage } from './calendar.page'; //importo el componente que es calendar.page.ts

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPageRoutingModule {}

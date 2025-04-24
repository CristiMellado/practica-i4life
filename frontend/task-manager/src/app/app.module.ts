import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {  provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; //añadi el fullcalendar


@NgModule({
    declarations: [AppComponent],
imports: [
BrowserModule,
IonicModule.forRoot(),
AppRoutingModule,
FormsModule,
FullCalendarModule //añadir el calendario
],
providers: [
    provideHttpClient(), // Agregamos el módulo HTTP
],
bootstrap: [AppComponent]
})
export class AppModule { }
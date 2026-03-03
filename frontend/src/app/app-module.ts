import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Estudiantes } from './components/estudiantes/estudiantes';
import { Cursos } from './components/cursos/cursos';
import { Inscripciones } from './components/inscripciones/inscripciones';

@NgModule({
  declarations: [App, Sidebar, Header, Estudiantes, Cursos, Inscripciones],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Estudiantes } from './components/estudiantes/estudiantes';
import { Cursos } from './components/cursos/cursos';
import { Inscripciones } from './components/inscripciones/inscripciones';

const routes: Routes = [
  { path: 'estudiantes', component: Estudiantes },
  { path: 'cursos', component: Cursos },
  { path: 'inscripciones', component: Inscripciones },
  { path: '', redirectTo: '/estudiantes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

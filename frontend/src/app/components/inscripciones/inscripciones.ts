import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../../models/inscripcion.model';
import { Estudiante } from '../../models/estudiante.model';
import { Curso } from '../../models/curso.model';
import { InscripcionService } from '../../services/inscripcion.service';
import { EstudianteService } from '../../services/estudiante.service';
import { CursoService } from '../../services/curso.service';
declare var bootstrap: any;

@Component({
  selector: 'app-inscripciones',
  standalone: false,
  templateUrl: './inscripciones.html',
  styleUrl: './inscripciones.css'
})
export class Inscripciones implements OnInit {
  inscripciones: Inscripcion[] = [];
  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  
  selectedInscripcion: Inscripcion = this.getEmptyInscripcion();
  isEditMode: boolean = false;
  modalInstance: any;

  constructor(
    private inscripcionService: InscripcionService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  getEmptyInscripcion(): Inscripcion {
    return { id: 0, estudianteId: 0, cursoId: 0, fechaInscripcion: new Date().toISOString().split('T')[0], estado: 'Activo' };
  }

  loadData(): void {
    this.inscripcionService.getInscripciones().subscribe(data => this.inscripciones = data);
    this.estudianteService.getEstudiantes().subscribe(data => this.estudiantes = data);
    this.cursoService.getCursos().subscribe(data => this.cursos = data);
  }

  openModal(inscripcion?: Inscripcion): void {
    if (inscripcion) {
      this.isEditMode = true;
      this.selectedInscripcion = { ...inscripcion };
      if (this.selectedInscripcion.fechaInscripcion) {
        this.selectedInscripcion.fechaInscripcion = this.selectedInscripcion.fechaInscripcion.split('T')[0];
      }
    } else {
      this.isEditMode = false;
      this.selectedInscripcion = this.getEmptyInscripcion();
    }
    const modalEl = document.getElementById('inscripcionModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.inscripcionService.updateInscripcion(this.selectedInscripcion.id, this.selectedInscripcion).subscribe(() => {
        this.loadData();
        this.modalInstance.hide();
      });
    } else {
      this.inscripcionService.createInscripcion(this.selectedInscripcion).subscribe(() => {
        this.loadData();
        this.modalInstance.hide();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar esta inscripción?')) {
      this.inscripcionService.deleteInscripcion(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';
declare var bootstrap: any;

@Component({
  selector: 'app-estudiantes',
  standalone: false,
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class Estudiantes implements OnInit {
  estudiantes: Estudiante[] = [];
  selectedEstudiante: Estudiante = this.getEmptyEstudiante();
  isEditMode: boolean = false;
  modalInstance: any;

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.loadEstudiantes();
  }

  getEmptyEstudiante(): Estudiante {
    return { id: 0, nombre: '', apellido: '', email: '', fechaNacimiento: '' };
  }

  loadEstudiantes(): void {
    this.estudianteService.getEstudiantes().subscribe(data => {
      this.estudiantes = data;
    });
  }

  openModal(estudiante?: Estudiante): void {
    if (estudiante) {
      this.isEditMode = true;
      // Copy Date for input format YYYY-MM-DD
      this.selectedEstudiante = { ...estudiante };
      if (this.selectedEstudiante.fechaNacimiento) {
        this.selectedEstudiante.fechaNacimiento = this.selectedEstudiante.fechaNacimiento.split('T')[0];
      }
    } else {
      this.isEditMode = false;
      this.selectedEstudiante = this.getEmptyEstudiante();
    }
    const modalEl = document.getElementById('estudianteModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.estudianteService.updateEstudiante(this.selectedEstudiante.id, this.selectedEstudiante).subscribe(() => {
        this.loadEstudiantes();
        this.modalInstance.hide();
      });
    } else {
      this.estudianteService.createEstudiante(this.selectedEstudiante).subscribe(() => {
        this.loadEstudiantes();
        this.modalInstance.hide();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este estudiante?')) {
      this.estudianteService.deleteEstudiante(id).subscribe(() => {
        this.loadEstudiantes();
      });
    }
  }
}

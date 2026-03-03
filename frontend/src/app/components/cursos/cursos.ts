import { Component, OnInit } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';
declare var bootstrap: any;

@Component({
  selector: 'app-cursos',
  standalone: false,
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit {
  cursos: Curso[] = [];
  selectedCurso: Curso = this.getEmptyCurso();
  isEditMode: boolean = false;
  modalInstance: any;

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.loadCursos();
  }

  getEmptyCurso(): Curso {
    return { id: 0, nombreCurso: '', descripcion: '', creditos: 0 };
  }

  loadCursos(): void {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = data;
    });
  }

  openModal(curso?: Curso): void {
    if (curso) {
      this.isEditMode = true;
      this.selectedCurso = { ...curso };
    } else {
      this.isEditMode = false;
      this.selectedCurso = this.getEmptyCurso();
    }
    const modalEl = document.getElementById('cursoModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.cursoService.updateCurso(this.selectedCurso.id, this.selectedCurso).subscribe(() => {
        this.loadCursos();
        this.modalInstance.hide();
      });
    } else {
      this.cursoService.createCurso(this.selectedCurso).subscribe(() => {
        this.loadCursos();
        this.modalInstance.hide();
      });
    }
  }

  delete(id: number): void {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.cursoService.deleteCurso(id).subscribe(() => {
        this.loadCursos();
      });
    }
  }
}

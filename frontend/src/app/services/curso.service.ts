import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = `${environment.apiUrl}/Cursos`;

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(id: number, curso: Curso): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, curso);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

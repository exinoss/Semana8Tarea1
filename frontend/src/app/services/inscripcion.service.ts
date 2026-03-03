import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscripcion } from '../models/inscripcion.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private apiUrl = `${environment.apiUrl}/Inscripciones`;

  constructor(private http: HttpClient) { }

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  getInscripcion(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.apiUrl}/${id}`);
  }

  createInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  updateInscripcion(id: number, inscripcion: Inscripcion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, inscripcion);
  }

  deleteInscripcion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

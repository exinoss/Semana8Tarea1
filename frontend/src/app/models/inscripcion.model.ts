import { Estudiante } from './estudiante.model';
import { Curso } from './curso.model';

export interface Inscripcion {
    id: number;
    estudianteId: number;
    cursoId: number;
    fechaInscripcion: string;
    estado: string;
    estudiante?: Estudiante;
    curso?: Curso;
}

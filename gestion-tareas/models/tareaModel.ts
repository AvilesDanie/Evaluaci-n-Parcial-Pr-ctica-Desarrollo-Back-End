
import { Usuario } from './usuarioModel';

export interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  usuarioId: number;
  fechaCreacion: string;
  fechaFinalizacion: string;
  estado: 'no iniciado' | 'en proceso' | 'finalizado';
  Usuario?: Usuario;
}

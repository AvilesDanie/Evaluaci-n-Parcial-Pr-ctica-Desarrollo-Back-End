
import axios from 'axios';
import { Tarea } from '../models/tareaModel';
import { Usuario } from '../models/usuarioModel';


export const tTareas = async (): Promise<Tarea[]> => {
  const response = await axios.get(`http://localhost:5000/api/tareas`);
  return response.data;
};

export const tUsuarios = async (): Promise<Usuario[]> => {
  const response = await axios.get(`http://localhost:5000/api/usuarios`);
  return response.data;
};

export const elimiTarea = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:5000/api/tareas/${id}`);
};

export const actTarea = async (tarea: Tarea): Promise<Tarea> => {
  const response = await axios.put(`http://localhost:5000/api/tareas/${tarea.id}`, tarea);
  return response.data;
};

export const creaTarea = async (tarea: Tarea): Promise<Tarea> => {
  const response = await axios.post(`http://localhost:5000/api/tareas`, tarea);
  return response.data;
};

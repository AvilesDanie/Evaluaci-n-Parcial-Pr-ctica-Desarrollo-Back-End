import { Request, Response } from 'express';
import { Tarea } from '../models/tareaModel';
import Usuario from '../models/usuarioModel';
import twilio from 'twilio';

//  Twilio
const Sid = <sid>;
const Token = <token>;
const cliente = twilio(Sid, Token);




// Obtener todas las tareas
export const obtenerTareas = async (req: Request, res: Response) => {
  try {
    const tareas = await Tarea.findAll({ include: [{ model: Usuario, as: 'Usuario' }] });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
  }
};

// Crear una nueva tarea
export const crearTarea = async (req: Request, res: Response) => {
  const { nombre, descripcion, usuarioId, fechaFinalizacion, estado } = req.body;
  try {
    const nuevaTarea = await Tarea.create({
      nombre,
      descripcion,
      usuarioId,
      fechaCreacion: new Date(),
      fechaFinalizacion,
      estado
    });

    const usuario = await Usuario.findByPk(usuarioId);

    if (usuario && usuario.contacto) {
      const numero = `whatsapp:${usuario.contacto}`;
      
      await cliente.messages.create({
        body: `Hola ${usuario.nombreUsuario}, se ha creado una nueva tarea: ${nombre}`,
        from: 'whatsapp:+14155238886',
        to: numero,
      }).catch((error) => console.error('Error al enviar mensaje:', error));
    }
    

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la tarea', error });
  }
};

// Actualizar una tarea
export const actualizarTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, usuarioId, fechaFinalizacion, estado } = req.body;
  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    tarea.nombre = nombre;
    tarea.descripcion = descripcion;
    tarea.usuarioId = usuarioId;
    tarea.fechaFinalizacion = fechaFinalizacion;
    tarea.estado = estado;
    await tarea.save();
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la tarea', error });
  }
};

// Eliminar una tarea
export const eliminarTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tarea = await Tarea.findByPk(id);
    if (!tarea) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    await tarea.destroy();
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la tarea', error });
  }
};

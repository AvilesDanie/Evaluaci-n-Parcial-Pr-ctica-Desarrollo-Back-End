import { Request, Response } from 'express';
import Usuario from '../models/usuarioModel';

//  Numero
function FormatoNumero(numero: string | undefined): string | null {
  if (!numero) {
    return null;
  }

  numero = numero.replace(/[\s()-]/g, '');

  if (!numero.startsWith('+593')) {
    if (numero.startsWith('0')) {
      numero = '+593' + numero.substring(1);
    } else {
      return null;
    }
  }

  if (numero.length !== 12 && numero.length !== 13) {
    return null;
  }

  return numero;
}

// Registrar un nuevo usuario
export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombreUsuario, contrasena, contacto } = req.body;

    if (!contacto) {
      return res.status(400).json({ mensaje: 'El campo contacto es requerido' });
    }

    const formattedContact = FormatoNumero(contacto);
    if (!formattedContact) {
      return res.status(400).json({ mensaje: 'Número de contacto no válido' });
    }

    const nuevoUsuario = await Usuario.create({ nombreUsuario, contrasena, contacto: formattedContact });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};

// Iniciar sesión
export const iniciarSesion = async (req: Request, res: Response) => {
  const { nombreUsuario, contrasena } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });
    if (!usuario || !(await usuario.validarContrasena(contrasena))) {
      return res.status(400).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }
    res.json({ mensaje: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

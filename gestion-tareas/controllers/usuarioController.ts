import axios from 'axios';

export const registrarUsuario = async (nombreUsuario: string, contrasena: string, contacto: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/registro', {
      nombreUsuario,
      contrasena,
      contacto,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al registrarse');
  }
};

export const iniciarSesion = async (nombreUsuario: string, contrasena: string) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/inicio-sesion', {
      nombreUsuario,
      contrasena,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

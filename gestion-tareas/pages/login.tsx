import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { iniciarSesion } from '../controllers/usuarioController';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const router = useRouter();

  const envio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await iniciarSesion(nombreUsuario, contrasena);
      alert('Inicio de sesión exitoso');
      router.push('/tareas');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Iniciar Sesión</h1>
      <form onSubmit={envio} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 font-bold">Nombre de Usuario</label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold">Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">
          Iniciar Sesión
        </button>
      </form>
      <Link href="/" legacyBehavior>
        <a className="mt-6 text-blue-500 hover:underline">Volver</a>
      </Link>
    </div>
  );
};

export default Login;

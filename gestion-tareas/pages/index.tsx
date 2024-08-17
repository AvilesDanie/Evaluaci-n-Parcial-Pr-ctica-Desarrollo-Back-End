import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-8 shadow-lg">Bienvenido a la Gestión de Tareas</h1>
      <div className="flex space-x-4">
        <Link href="/login" legacyBehavior>
          <a className="px-6 py-3 bg-green-500 rounded-full text-xl shadow-lg hover:bg-green-600 transition">Iniciar Sesión</a>
        </Link>
        <Link href="/register" legacyBehavior>
          <a className="px-6 py-3 bg-yellow-500 rounded-full text-xl shadow-lg hover:bg-yellow-600 transition">Registrarse</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;

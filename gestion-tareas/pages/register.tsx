import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { registrarUsuario } from "../controllers/usuarioController";

const Registro = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contacto, setContacto] = useState(""); // Nuevo estado para el contacto
  const router = useRouter();

  const envio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registrarUsuario(nombreUsuario, contrasena, contacto); // Incluye el contacto al registrar
      alert("Registro exitoso");
      router.push("/tareas");
    } catch (error) {
      alert("Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Registrarse
      </h1>
      <form
        onSubmit={envio}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="mb-6">
          <label className="block text-gray-700 font-bold">
            Nombre de Usuario
          </label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold">Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold">Contacto</label>
          <input
            type="text"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            placeholder="0987654321"
            className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
        >
          Registrarse
        </button>
      </form>
      <Link href="/" legacyBehavior>
        <a className="mt-6 text-blue-500 hover:underline">Volver</a>
      </Link>
    </div>
  );
};

export default Registro;

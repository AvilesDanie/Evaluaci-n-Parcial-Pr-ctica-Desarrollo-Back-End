import { useState, useEffect } from 'react';
import { Tarea } from '../models/tareaModel';
import { Usuario } from '../models/usuarioModel';
import { tTareas, tUsuarios, elimiTarea, actTarea, creaTarea } from '../controllers/tareaController';
import Link from 'next/link';

const Tareas = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [usuarioId, setUsuarioId] = useState(1);
  const [fechaFinalizacion, setFechaFinalizacion] = useState('');
  const [estado, setEstado] = useState<'no iniciado' | 'en proceso' | 'finalizado'>('no iniciado');
  const [editandoTarea, seteditandoTarea] = useState<Tarea | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const tareasData = await tTareas();
      const usuariosData = await tUsuarios();
      setTareas(tareasData);
      setUsuarios(usuariosData);
    };
    fetchData();
  }, []);

  const eliminarTarea = async (id: number) => {
    await elimiTarea(id);
    setTareas(await tTareas());
  };

  const editarTarea = (tarea: Tarea) => {
    seteditandoTarea(tarea);
    setNombre(tarea.nombre);
    setDescripcion(tarea.descripcion);
    setUsuarioId(tarea.usuarioId);
    setFechaFinalizacion(tarea.fechaFinalizacion.split('T')[0]);
    setEstado(tarea.estado);
  };

  const crearTarea = async (e: React.FormEvent) => {
    e.preventDefault();

    const fechaSeleccionada = new Date(fechaFinalizacion);
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);

    const fechaFinalizacionIncrementada = fechaSeleccionada.toISOString().split('T')[0];

    const tarea: Tarea = {
      id: editandoTarea?.id || 0,
      nombre,
      descripcion,
      usuarioId,
      fechaFinalizacion: fechaFinalizacionIncrementada,
      estado,
      fechaCreacion: new Date().toISOString()
    };

    if (editandoTarea) {
      await actTarea(tarea);
      seteditandoTarea(null);
    } else {
      await creaTarea(tarea);
    }

    setNombre('');
    setDescripcion('');
    setFechaFinalizacion('');
    setEstado('no iniciado');
    setTareas(await tTareas());
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">No Iniciado</h2>
            {tareas.filter(tarea => tarea.estado === 'no iniciado').map(tarea => (
              <div key={tarea.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-xl font-semibold"><strong>Nombre:</strong> {tarea.nombre}</h3>
                <p><strong>Descripción:</strong> {tarea.descripcion}</p>
                <p><strong>Encargado:</strong> {tarea.Usuario ? tarea.Usuario.nombreUsuario : 'Desconocido'}</p>
                <p><strong>Creado el:</strong> {new Date(tarea.fechaCreacion).toLocaleDateString()}</p>
                <p><strong>Finalización:</strong> {tarea.fechaFinalizacion ? new Date(tarea.fechaFinalizacion).toLocaleDateString() : 'No definida'}</p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => editarTarea(tarea)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Editar</button>
                  <button onClick={() => eliminarTarea(tarea.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">En Proceso</h2>
            {tareas.filter(tarea => tarea.estado === 'en proceso').map(tarea => (
              <div key={tarea.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-xl font-semibold"><strong>Nombre:</strong> {tarea.nombre}</h3>
                <p><strong>Descripción:</strong> {tarea.descripcion}</p>
                <p><strong>Encargado:</strong> {tarea.Usuario ? tarea.Usuario.nombreUsuario : 'Desconocido'}</p>
                <p><strong>Creado el:</strong> {new Date(tarea.fechaCreacion).toLocaleDateString()}</p>
                <p><strong>Finalización:</strong> {tarea.fechaFinalizacion ? new Date(tarea.fechaFinalizacion).toLocaleDateString() : 'No definida'}</p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => editarTarea(tarea)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Editar</button>
                  <button onClick={() => eliminarTarea(tarea.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Finalizado</h2>
            {tareas.filter(tarea => tarea.estado === 'finalizado').map(tarea => (
              <div key={tarea.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <h3 className="text-xl font-semibold"><strong>Nombre:</strong> {tarea.nombre}</h3>
                <p><strong>Descripción:</strong> {tarea.descripcion}</p>
                <p><strong>Encargado:</strong> {tarea.Usuario ? tarea.Usuario.nombreUsuario : 'Desconocido'}</p>
                <p><strong>Creado el:</strong> {new Date(tarea.fechaCreacion).toLocaleDateString()}</p>
                <p><strong>Finalización:</strong> {tarea.fechaFinalizacion ? new Date(tarea.fechaFinalizacion).toLocaleDateString() : 'No definida'}</p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => editarTarea(tarea)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Editar</button>
                  <button onClick={() => eliminarTarea(tarea.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-6">{editandoTarea ? 'Editar Tarea' : 'Crear Tarea'}</h2>
          <form onSubmit={crearTarea}>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold">Encargado</label>
              <select
                value={usuarioId}
                onChange={(e) => setUsuarioId(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {usuarios.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>{usuario.nombreUsuario}</option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold">Fecha de Finalización</label>
              <input
                type="date"
                value={fechaFinalizacion}
                onChange={(e) => setFechaFinalizacion(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold">Estado</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value as 'no iniciado' | 'en proceso' | 'finalizado')}
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="no iniciado">No Iniciado</option>
                <option value="en proceso">En Proceso</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">
              {editandoTarea ? 'Actualizar Tarea' : 'Crear Tarea'}
            </button>
          </form>
        </div>
      </div>
      <Link href="/" legacyBehavior>
        <a className="mt-6 text-blue-500 hover:underline">Volver</a>
      </Link>
    </div>
  );
};

export default Tareas;

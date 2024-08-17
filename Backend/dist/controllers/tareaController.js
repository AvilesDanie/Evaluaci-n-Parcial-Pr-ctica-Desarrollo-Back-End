"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarTarea = exports.actualizarTarea = exports.crearTarea = exports.obtenerTareas = void 0;
const tareaModel_1 = require("../models/tareaModel");
const usuarioModel_1 = require("../models/usuarioModel");
// Obtener todas las tareas
const obtenerTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tareas = yield tareaModel_1.Tarea.findAll({ include: [{ model: usuarioModel_1.Usuario, as: 'Usuario' }] });
        res.json(tareas);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
    }
});
exports.obtenerTareas = obtenerTareas;
// Crear una nueva tarea
const crearTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, usuarioId, fechaFinalizacion, estado } = req.body;
    try {
        const nuevaTarea = yield tareaModel_1.Tarea.create({
            nombre,
            descripcion,
            usuarioId,
            fechaCreacion: new Date(),
            fechaFinalizacion,
            estado
        });
        res.status(201).json(nuevaTarea);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la tarea', error });
    }
});
exports.crearTarea = crearTarea;
// Actualizar una tarea
const actualizarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, usuarioId, fechaFinalizacion, estado } = req.body;
    try {
        const tarea = yield tareaModel_1.Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        tarea.nombre = nombre;
        tarea.descripcion = descripcion;
        tarea.usuarioId = usuarioId;
        tarea.fechaFinalizacion = fechaFinalizacion;
        tarea.estado = estado;
        yield tarea.save();
        res.json(tarea);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la tarea', error });
    }
});
exports.actualizarTarea = actualizarTarea;
// Eliminar una tarea
const eliminarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tarea = yield tareaModel_1.Tarea.findByPk(id);
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        yield tarea.destroy();
        res.json({ mensaje: 'Tarea eliminada' });
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la tarea', error });
    }
});
exports.eliminarTarea = eliminarTarea;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const tareaRoutes_1 = __importDefault(require("./routes/tareaRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/tareas', tareaRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/usuarios', usuarioRoutes_1.default);
database_1.sequelize.sync().then(() => {
    console.log('Conexión establecida correctamente.');
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

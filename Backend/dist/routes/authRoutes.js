"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/registro', authController_1.registrarUsuario);
router.post('/inicio-sesion', authController_1.iniciarSesion);
exports.default = router;

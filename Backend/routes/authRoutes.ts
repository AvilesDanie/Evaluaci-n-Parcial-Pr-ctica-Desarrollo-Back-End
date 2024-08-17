import { Router } from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/authController';

const router = Router();

router.post('/registro', registrarUsuario);
router.post('/inicio-sesion', iniciarSesion);

export default router;

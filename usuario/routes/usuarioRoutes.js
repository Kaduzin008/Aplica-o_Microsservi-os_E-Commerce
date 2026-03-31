import express from 'express';
import { createUsuario, getUsuarioById, getUsuarios } from '../controllers/usuarioController.js'; 

const router = express.Router();

router.post('/usuario', createUsuario);
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);

export default router;
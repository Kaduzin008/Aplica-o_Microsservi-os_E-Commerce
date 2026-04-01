import express from 'express';
import { createEstoque, getEstoques, getEstoqueById, getEstoqueByNome, baixarEstoque } from '../controllers/estoqueController.js';

const router = express.Router();

router.post('/estoque', createEstoque);
router.get('/estoques', getEstoques);
router.get('/estoque/:produto', getEstoqueByNome);
router.get('/estoque/id/:id', getEstoqueById);
router.post('/estoque/baixar', baixarEstoque);

export default router;
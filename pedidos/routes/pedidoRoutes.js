import express from 'express';
import { createPedido, getPedidos, getPedidoById } from '../controllers/pedidoController.js'; 

const router = express.Router();

router.post('/pedido', createPedido);
router.get('/pedidos', getPedidos);
router.get('/pedidos/:id', getPedidoById);

export default router;
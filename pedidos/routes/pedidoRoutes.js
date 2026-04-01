import express from 'express';
import { createPedido, getPedidos, getPedidoById, getPedidosByUsuario, updateStatusPedido } from '../controllers/pedidoController.js'; 

const router = express.Router();

router.post('/pedido', createPedido);
router.get('/pedidos', getPedidos);
router.get('/pedidos/:id', getPedidoById);
router.get('/pedidos/usuario/:id_usuario', getPedidosByUsuario);
router.patch('/pedido/:id/status', updateStatusPedido);

export default router;
import express from 'express';
import { createPagamento, getPagamentos, getPagamentoById, updateStatusPedido } from '../controllers/pagamentoController.js';

const router = express.Router();

router.post('/pagamento', createPagamento);
router.get('/pagamentos', getPagamentos);
router.get('/pagamento/:id', getPagamentoById);
router.patch('/pedido/:id/status', updateStatusPedido);

export default router;
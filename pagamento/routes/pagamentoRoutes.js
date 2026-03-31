import express from 'express';
import { createPagamento, getPagamentos, getPagamentoById } from '../controllers/pagamentoController.js';

const router = express.Router();

router.post('/pagamento', createPagamento);
router.get('/pagamentos', getPagamentos);
router.get('/pagamento/:id', getPagamentoById);

export default router;
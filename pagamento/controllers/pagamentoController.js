import Pagamento from '../models/pagamento.js';

//Criar um pagamento (Chamado pelo microsserviço de Pedidos)
export const createPagamento = async (req, res) => {
    try {
        const { valor_final, pagante } = req.body;
        const novoPagamento = await Pagamento.create({
            valor_final,
            pagante
        }); //Cria o pagamento com o valor final e o pagante
        //Mensagem de sucesso, com status pago 
        res.status(201).json({ status: "PAGO", pagamento: novoPagamento });
    } catch (err) {
        //Mensagem de cancelado e mensagem de erro, com status cancelado
        res.status(400).json({ status: "CANCELADO", error: err.message });
    }
};

//Lista todos os pagamentos
export const getPagamentos = async (req, res) => {
    try {
        const itens = await Pagamento.findAll();
        res.status(200).json(itens); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Buscar um pagamento específico por ID
export const getPagamentoById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Pagamento.findByPk(id); 
        
        if (!item) {
            return res.status(404).json({ message: "Pagamento não encontrado" }); 
        }
        res.status(200).json(item); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
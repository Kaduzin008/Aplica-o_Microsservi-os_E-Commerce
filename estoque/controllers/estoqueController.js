import Estoque from '../models/estoque.js';

// Criar um novo registro de estoque
export const createEstoque = async (req, res) => {
    try {
        const { produto_estoque, qtd_estoque } = req.body; 
        const novoEstoque = await Estoque.create({
            produto_estoque,
            qtd_estoque
        }); //Define o produto e sua quantidade
        res.status(201).json(novoEstoque); //Mensagem de sucesso e registra o item
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Listar todo estoque
export const getEstoques = async (req, res) => {
    try {
        const itens = await Estoque.findAll();
        res.status(200).json(itens) //Lista TODOS os itens e retorna-os
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lista item por ID
export const getEstoqueById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Estoque.findByPk(id);// Busca o item por id

        if (!item) {
            return res.status(404).json({ message: "Estoque não encontrado" }); // Mensagem de erro se nao achar
        }
        res.status(200).json(item); // Mensagem de sucesso e o item
    }   catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lista item por nome
export const getEstoqueByNome = async (req, res) => {
    try {
        const { produto } = req.params;

        const item = await Estoque.findOne({
            where: { produto_estoque: produto }
        }); // Procura o estoque pelo nome do produto

        if (!item) {
            return res.status(404).json({ message: "Produto não encontrado no estoque" });
        }
        res.status(200).json(item); // Retorna a quantidade em estoque para o Pedido validar
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Reduz do estoque apos feito o pedido
export const baixarEstoque = async (req, res) => {
    try {
        const { produto, quantidade } = req.body;

        const item = await Estoque.findOne({ where: { produto_estoque: produto } });
        if (!item) {
            return res.status(404).json({ error: "Produto não encontrado no estoque" });
        }
        if (item.qtd_estoque < quantidade) {// Evita que o estoque fique negativo
            return res.status(400).json({ error: "Estoque insuficiente!" });
        }
        item.qtd_estoque -= quantidade; // Subtrai a quantidade vendida
        await item.save();

        res.status(200).json({ message: "Estoque atualizado!", novoTotal: item.qtd_estoque });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
import Pedido from '../models/pedido.js';

// Criar um pedido
export const createPedido = async (req, res) => {
    try {
        const { id_usuario, produto, quantidade } = req.body;
        //1. Consulta o catalogo, afim de saber o preco
        const resCatalogo = await fetch(`http://localhost:3003/catalogo/${produto}`);

        if(!resCatalogo.ok){//Mensagem de erro caso nao ache o produto
            return res.status(404).json({ error: "Produto não encontrado no catálogo!" });
        }
        const dadosCatalogo = await resCatalogo.json();
        const precoUnitario = dadosCatalogo.preco; //Registra o preco do produto

        //2. Consulta o estoque, afim de saber se tem o produto
        const resEstoque = await fetch(`http://localhost:3004/estoque/${produto}`);
        const dadosEstoque = await resEstoque.json(); //Retorna se existe estoque e quanto

        if(dadosEstoque.qtd_estoque < quantidade) {//Mensagem de erro caso nao tenha no estoque
            return res.status(400).json({ error: "Desculpe, estoque insuficiente!" });
        }

        //3. Consultando o pagante
        const resUsuario = await fetch(`http://localhost:3001/usuarios/${id_usuario}`);
        if(!resUsuario.ok){//Se o usuario nao for cadastrado, retorna mensagem de erro
            return res.status(404).json({ error: "Usuário não cadastrado!" });
        }
        const dadosUsuario = await resUsuario.json();
        const nomePagante = dadosUsuario.nome;//Retorna o nome do pagante 

        //4. Criar o pedido no banco de dados
        const novoPedido = await Pedido.create({
            produto: produto,
            qtd_produto: quantidade,
            id_usuario: id_usuario, 
            status: 'PENDENTE'      
        })

        //5. Criando o pagamento
        const valorFinal = precoUnitario * quantidade; 

        //Realiza um FETCH (Consulta outra localhost), e envia os dados via endpoint POST (Obs: Como se fosse um thunderclient automatizado)
        const resPagamento = await fetch('http://localhost:3005/pagamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                valor_final: valorFinal,
                pagante: nomePagante
            })
        });

        if (resPagamento.status === 201) {//Mensagem de sucesso se for pago
            return res.status(201).json({ status: "PAGO", pedido: novoPedido });
        } else {//Mensagem de cancelado se nao for pago
            return res.status(400).json({ status: "CANCELADO" });
        }
    } catch (err) {//Mensagem de erro se caso qualquer um dos servicos falhe
        res.status(500).json({ error: "Erro de comunicação: " + err.message });
    }
};

// Listar todos os pedidos
export const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Listar pedido por ID
export const getPedidoById = async(req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }
            res.status(200).json(pedido);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Busca o pedido por ID do usuário, e ordena do mais recente para o mais antigo
export const getPedidosByUsuario = async (req, res) => {
    const { id_usuario } = req.params;
    try {
        const pedidos = await Pedido.findAll({ 
            where: { id_usuario: id_usuario },
            order: [['createdAt', 'DESC']] // Os mais recentes primeiro
        });
        res.status(200).json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualiza o Status do pedido
export const updateStatusPedido = async (req, res) => {
    const { id } = req.params;
    const { novoStatus } = req.body;

    try {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" });

        pedido.status = novoStatus;
        await pedido.save();

        // SE O STATUS FOR PAGO, DISPARA A BAIXA NO ESTOQUE
        if (novoStatus === 'PAGO') {
            await fetch('http://localhost:3004/estoque/baixar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    produto: pedido.produto, 
                    quantidade: pedido.qtd_produto 
                })
            });
        }

        res.status(200).json({ message: "Pedido atualizado e estoque comunicado!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


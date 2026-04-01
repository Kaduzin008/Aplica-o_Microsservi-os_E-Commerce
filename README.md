# E-Commerce API - Arquitetura de Microsserviços (SOA)

Este projeto é um sistema completo de E-commerce construído com base na **Arquitetura Orientada a Serviços (SOA)**. O sistema foi dividido em microsserviços independentes, cada um com sua própria responsabilidade e banco de dados isolado, garantindo escalabilidade e resiliência.

## Tecnologias Utilizadas
* **Node.js** com **Express** (Criação das APIs)
* **Sequelize** (ORM para manipulação do banco de dados)
* **MySQL** (Banco de dados relacional)
* **HTML/CSS/JS** (Front-end puro consumindo as APIs via Fetch)

## Arquitetura dos Microsserviços
O projeto roda simultaneamente em 5 portas locais, comunicando-se via HTTP:

1. **Usuários (Porta 3001):** Gerencia cadastro e autenticação de clientes.
2. **Pedidos (Porta 3002):** Orquestra a compra, validando estoque, catálogo e chamando o pagamento.
3. **Catálogo (Porta 3003):** Vitrine de produtos e preços.
4. **Estoque (Porta 3004):** Gerencia a quantidade disponível e barra compras sem saldo.
5. **Pagamento (Porta 3005):** Simula o gateway de pagamento (Aprovado/Cancelado).

## 🚀 Como Rodar o Projeto

**1.** Abra o seu terminal e clone o projeto para a sua máquina:
**git clone https://github.com/Kaduzin008/Aplica-o_Microsservi-os_E-Commerce.git**

**2.** Configurar o Banco de Dados (MySQL)
Use os comandos no MySQL e os rode:
**CREATE DATABASE db_usuario;
CREATE DATABASE db_pedido;
CREATE DATABASE db_catalogo;
CREATE DATABASE db_estoque;
CREATE DATABASE db_pagamento;**

**3.** Instalar Dependências e CORS
Na raiz do projeto, execute os comandos que configuramos no nosso package.json para instalar tudo de uma vez e garantir a comunicação entre as portas:
**npm run install-all** (Instala todos os node-modules)
**npm run install-cors** (Instala o cors em todos os serviços)

**4.** Configurar as Variáveis de Ambiente (.env)
Em cada pasta de microsserviço (usuario, pedido, catalogo, estoque, pagamento), crie um arquivo chamado .env e adicione as suas credenciais do banco de dados:
**DB_HOST=localhost
DB_USER=seu_usuario_aqui
DB_PASS=sua_senha_aqui
DB_NAME=nome_do_banco_especifico_da_pasta
PORT=porta_especifica_do_servico**

**5.** Iniciar o Sistema
Agora, basta um único comando na raiz do projeto para subir todos os 5 serviços simultaneamente:
**npm run start-all**

**6.** Acessar o Front-end
Com os serviços rodando, abra o arquivo login.html no seu navegador (recomendado usar a extensão Live Server do VS Code).

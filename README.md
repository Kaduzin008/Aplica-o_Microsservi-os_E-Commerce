#  E-Commerce API - Arquitetura de Microsserviços (SOA)

Este projeto é um sistema completo de E-commerce construído com base na **Arquitetura Orientada a Serviços (SOA)**. O sistema foi dividido em microsserviços independentes, cada um com sua própria responsabilidade e banco de dados isolado, garantindo escalabilidade e resiliência.

##  Tecnologias Utilizadas
* **Node.js** com **Express** (Criação das APIs)
* **Sequelize** (ORM para manipulação do banco de dados)
* **MySQL** (Banco de dados relacional)
* **HTML/CSS/JS** (Front-end puro consumindo as APIs via Fetch)

##  Arquitetura dos Microsserviços
O projeto roda simultaneamente em 5 portas locais, comunicando-se via HTTP:

1. **Usuários (Porta 3001):** Gerencia cadastro e autenticação de clientes.
2. **Pedidos (Porta 3002):** Orquestra a compra, validando estoque, catálogo e chamando o pagamento.
3. **Catálogo (Porta 3003):** Vitrine de produtos e preços.
4. **Estoque (Porta 3004):** Gerencia a quantidade disponível e barra compras sem estoque.
5. **Pagamento (Porta 3005):** Simula o gateway de pagamento (Aprovado/Cancelado).

---

## Como Rodar o Projeto

### 1. Clonar o Repositório
Abra o seu terminal e clone o projeto para a sua máquina:
```bash
git clone https://github.com/Kaduzin008/Aplica-o_Microsservi-os_E-Commerce.git
```

### 2. Configurar o Banco de Dados (MySQL)
Abra seu terminal MySQL ou Workbench e execute os seguintes comandos para criar os bancos isolados:
```sql
CREATE DATABASE db_usuario;
CREATE DATABASE db_pedido;
CREATE DATABASE db_catalogo;
CREATE DATABASE db_estoque;
CREATE DATABASE db_pagamento;
```

### 3. Instalar Dependências e CORS
Na raiz do projeto, execute os comandos configurados no seu arquivo `package.json` para instalar tudo de uma vez e garantir a comunicação entre as portas:
```bash
npm run install-all
npm run install-cors
```

### 4. Configurar as Variáveis de Ambiente (.env)
Em **cada pasta** de microsserviço (usuario, pedido, catalogo, estoque, pagamento), crie um arquivo chamado `.env` e adicione as suas credenciais do banco de dados:
```env
DB_HOST=localhost
DB_USER=seu_usuario_aqui
DB_PASS=sua_senha_aqui
DB_NAME=nome_do_banco_especifico_da_pasta
PORT=porta_especifica_do_servico
```

### 5. Iniciar o Sistema
Agora, basta um único comando na raiz do projeto para subir todos os 5 serviços simultaneamente:
```bash
npm run start-all
```

### 6. Popular o Banco de Dados (Thunder Client / Postman)
Como os bancos de dados acabaram de ser recriados, você precisa adicionar os produtos no Catálogo e no Estoque para que eles apareçam no Front-end. Faça requisições **POST** enviando um corpo em JSON.

**A) Adicionar no Catálogo (POST -> `http://localhost:3003/catalogo`):**
```json
{
  "produto_catalogo": "Teclado Mecânico RGB",
  "preco": 350.00
}
```

**B) Adicionar no Estoque (POST -> `http://localhost:3004/estoque`):**
```json
{
  "produto_estoque": "Teclado Mecânico RGB",
  "qtd_estoque": 20
}
```
*(Repita este processo para os demais produtos de teste listados na seção abaixo)*

### 7. Acessar o Front-end
Com os serviços rodando e os produtos cadastrados, abra o arquivo `login.html` no seu navegador (recomendado usar a extensão **Live Server** do VS Code).

---

## 🧪 Testes Realizados
Para validar a arquitetura, foram cadastrados e testados os seguintes itens:

* **Teclado Mecânico RGB** Preço: (R$ 350,00) Quantidade: (20)
* **Monitor Ultrawide 29"** Preço: (R$ 1250,00) Quantidade: (8)
* **Headset Gamer 7.1** Preço: (R$ 220,90) Quantidade: (0)

**Cenários de Erro Tratados:**
- [x] Tentativa de compra com estoque insuficiente (Bloqueio no Microsserviço de Estoque).
- [x] Pagamento cancelado (O pedido é registrado como CANCELADO e o estoque não é reduzido).

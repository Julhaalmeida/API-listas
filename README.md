
# 📦 API de Gerenciamento de Pedidos (Desafio Jitterbit)

Esta é uma API RESTful desenvolvida para o gerenciamento de pedidos, permitindo a criação, leitura e organização de itens. O projeto segue a arquitetura **MVC** (Model-View-Controller) para garantir uma estrutura limpa e escalável.

## 🚀 Tecnologias Utilizadas
* **Node.js**: Ambiente de execução Javascript.
* **Express**: Framework web para as rotas.
* **MongoDB & Mongoose**: Banco de dados NoSQL e modelagem de dados.
* **Dotenv**: Gerenciamento de variáveis de ambiente.

## 🛠️ Como rodar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Julhaalmeida/API-listas.git](https://github.com/Julhaalmeida/API-listas.git)
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e adicione sua string de conexão do MongoDB:
   ```env
   MONGO_URI=sua_conexao_aqui
   PORT=3000
   ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```

## 🛣️ Rotas da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **POST** | `/orders` | Cria um novo pedido no banco de dados. |
| **GET** | `/orders` | Lista todos os pedidos cadastrados. |

## 📂 Estrutura de Pastas
A organização do projeto segue o padrão MVC:
* `models/`: Definição dos esquemas do banco de dados (Mongoose).
* `controllers/`: Lógica de negócio e resposta às requisições.
* `routes/`: Definição dos pontos de entrada (endpoints) da API.
* `config/`: Configurações de banco de dados e ambiente.
```

---

### Por que usar essa estrutura?
Como notei pelas suas pastas (`controllers`, `models`, `routes`), você já está usando o padrão **MVC**. Isso é excelente! 



[Image of MVC architecture diagram]


* **Model:** Cuida dos dados (seu `orderModel.js`).
* **Controller:** Cuida da lógica (seu `orderController.js`).
* **Routes:** Direciona o tráfego para o lugar certo (seu `orderRoutes.js`).

### Como subir essa atualização para o GitHub?
Sempre que você alterar o README (ou qualquer código), o processo é sempre o mesmo "trio elétrico" de comandos:

1.  `git add .` (Prepara a mudança)
2.  `git commit -m "docs: atualizando o readme com instruções de uso"` (Dá nome à mudança)
3.  `git push` (Envia para o site)


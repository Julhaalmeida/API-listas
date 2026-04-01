#Desafio Backend -

Este projeto é uma API desenvolvida para o processo seletivo de Analista de Sistemas Jr. A aplicação realiza o gerenciamento de pedidos (Orders), permitindo a criação, listagem, atualização e exclusão de registros (CRUD) integrados com MongoDB.

#Tecnologias Utilizadas Node.js & Express (Framework Web) Mongoose (Modelagem de dados/MongoDB) Dotenv (Variáveis de ambiente) Nodemon (Ambiente de desenvolvimento)

#Estrutura do Projeto O projeto segue o padrão MVC para garantir escalabilidade e organização: config/: Configurações de banco de dados. controllers/: Lógica de negócio e tratamento de requisições. models/: Definição dos esquemas de dados. routes/: Definição dos endpoints da API.

#Como executar o projeto Instalar as dependências:

#Bash npm install Configurar o ambiente: Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

#Code snippet PORT=3000 MONGO_URI=sua_string_de_conexao_com_o_mongodb Executar o projeto:

#Bash npm run dev

#Endpoints Método Endpoint Descrição POST /order Cria um novo pedido GET /order/:id Busca um pedido por ID GET /order/list Lista todos os pedidos PUT /order/:id Atualiza um pedido existente DELETE /order/:id Remove um pedido

Exemplo de JSON (Payload) Abaixo, um exemplo do formato esperado pela API no POST /order:

{ "numeroPedido": "v10089016vdb", "valorTotal": 10000, "dataCriacao": "2023-07-19T12:24:11.529Z", "items": [ { "idItem": "2434", "quantidadeItem": 1, "valorItem": 1000 } ] }
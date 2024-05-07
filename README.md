📝 **FreeWork Sistema - Documentação**

👁️‍🗨️ **Visão Geral**
O FreeWork Sistema é uma aplicação web desenvolvida para gerenciar autenticação de usuários e suas permissões de acesso, além de fornecer funcionalidades como registro de ponto, gestão de tarefas, cálculo de horas trabalhadas e geração de relatórios.

🛠️ **Tecnologias Utilizadas**
Backend: Node.js, Express.js, MongoDB, Mongoose
Frontend: React.js
Bibliotecas: Axios, bcrypt, jsonwebtoken, @hapi/joi, dotenv
Ambiente de Desenvolvimento: Concurrently
Persistência de Dados: MongoDB

🚀 **Funcionalidades**
**Autenticação de Usuários**
Os usuários podem fazer login usando seu email e senha.
Após o login bem-sucedido, um token de autenticação é gerado e armazenado no Local Storage do navegador.
O token é utilizado para autorizar o acesso a áreas restritas da aplicação.

**Registro de Ponto**
Os usuários podem registrar sua entrada e saída do trabalho.
Os registros de ponto são armazenados no banco de dados.

**Gestão de Tarefas**
Os usuários podem criar, visualizar, editar e excluir tarefas.
As tarefas incluem um título, descrição e data de conclusão.

**Cálculo de Horas Trabalhadas**
Os usuários podem visualizar o total de horas trabalhadas em um determinado período.

**Relatórios**
Os usuários podem gerar relatórios com base nos registros de ponto e tarefas concluídas.

📡 **Endpoints da API**
- POST /login
  - Descrição: Endpoint para autenticação de usuários.
  - Corpo da Requisição: { email: string, password: string }
  - Resposta de Sucesso: { token: string }
  - Resposta de Erro: { error: string }

- POST /login/register
  - Descrição: Endpoint para registro de novos usuários.
  - Corpo da Requisição: { name: string, email: string, password: string }
  - Resposta de Sucesso: { message: string }
  - Resposta de Erro: { error: string }

- GET /auth
  - Descrição: Endpoint para verificação da autenticidade do token.
  - Cabeçalho da Requisição: authorization-token: string
  - Resposta de Sucesso: { status: string }
  - Resposta de Erro: { error: string }

- POST /pointer/post
  - Descrição: Endpoint para registro de ponto.
  - Corpo da Requisição: { name: string, pointer: string }
  - Resposta de Sucesso: { message: string }
  - Resposta de Erro: { error: string }

- POST /pointer/get
  - Descrição: Endpoint para obter registros de ponto de um determinado usuário.
  - Corpo da Requisição: { name: string, month: number }
  - Resposta de Sucesso: { registros: [ { days: [ { data: string, pointers: [ string ] } ] } ] }
  - Resposta de Erro: { error: string }

👩‍💻 **Usuários de Exemplo**
Email: admin@admin.com
Senha: admin

🔧 **Instalação e Execução**
1. Clone o repositório do projeto:
```bash
git clone https://github.com/seu-usuario/freework-sistema.git
```
2. Instale as dependências do projeto:
```bash
cd freework-sistema
npm install
```
3. Configure as variáveis de ambiente:
   - Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:
     ``
    PORT = 8080
    MONGO_CONNECT_URL = mongodb+srv://root:Andrey1309.@cluster0.nhew8ef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    SALT = 10
    TOKEN_SECRET= SAdihqwuidUIHDA2dsauh
    NODE_ENV=development
     ``
4. Inicie o servidor Node.js:
```bash
npm run start_node
```
5. Em outra aba do terminal, inicie o servidor de desenvolvimento do React:
```bash
npm run start_client
```
A aplicação estará disponível em http://localhost:3000.

🤝 **Contribuição**
Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou relatar problemas.

📜 **Licença**
Este projeto está licenciado sob a Licença ISC.

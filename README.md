# Gestor de Projetos Full-Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

Uma aplicação web completa (MERN stack) para gerenciamento de tarefas, com autenticação de usuários e operações CRUD (Criar, Ler, Atualizar, Deletar). Cada usuário pode gerenciar suas próprias tarefas de forma segura.


## ✨ Features

* **Autenticação de Usuários:** Sistema completo de Registro e Login.
* **Segurança:** Senhas criptografadas com `bcryptjs` e rotas protegidas com `JSON Web Tokens (JWT)`.
* **Gerenciamento de Tarefas (CRUD):**
    * **Criar** novas tarefas com título e descrição.
    * **Listar** todas as tarefas pertencentes ao usuário logado.
    * **Atualizar** o status de uma tarefa (ex: "A Fazer" para "Concluído").
    * **Excluir** uma tarefa.
* **Front-end Reativo:** Interface construída com React, proporcionando uma experiência de usuário fluida e sem recarregamento de página.
* **Gerenciamento de Estado:** Uso da Context API do React para gerenciar o estado de autenticação globalmente.
* **Estilização Modular:** Componentes estilizados com CSS Modules para evitar conflitos de estilo.

## 🛠️ Tecnologias Utilizadas

#### **Back-end**
* **Node.js:** Ambiente de execução do JavaScript no servidor.
* **Express.js:** Framework para criação da API RESTful.
* **MongoDB:** Banco de dados NoSQL para armazenar os dados.
* **Mongoose:** ODM para modelar os dados da aplicação.
* **JSON Web Token (JWT):** Para autorização e proteção de rotas.
* **bcryptjs:** Para criptografia de senhas.
* **dotenv:** Para gerenciamento de variáveis de ambiente.

#### **Front-end**
* **React:** Biblioteca para construção da interface de usuário.
* **Vite:** Ferramenta de build e servidor de desenvolvimento extremamente rápido.
* **React Router:** Para gerenciamento de rotas e navegação.
* **Axios:** Para fazer as requisições HTTP para o back-end.
* **React Context API:** Para gerenciamento de estado global (autenticação).
* **CSS Modules:** Para estilização dos componentes.

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

#### **Pré-requisitos**
* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* Uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para o banco de dados.

#### **1. Configuração do Back-end**
```bash
# Clone o repositório (ou use a sua pasta do projeto)
# cd gestor-de-projetos

# Navegue para a pasta do back-end
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz da pasta 'backend' e adicione as seguintes variáveis:
MONGO_URI="SUA_STRING_DE_CONEXAO_DO_MONGODB_ATLAS"
JWT_SECRET="SUA_CHAVE_SECRETA_PARA_O_JWT"
PORT=5000

# Inicie o servidor do back-end
npm run dev
```

#### **2. Configuração do Front-end**
```bash
# Em um novo terminal, navegue para a pasta do front-end
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento do front-end
npm run dev
```
Após seguir os passos, o front-end estará rodando em `http://localhost:5173` (ou outra porta indicada no terminal) e o back-end em `http://localhost:5000`.

## 📝 Endpoints da API

| Rota                  | Método   | Descrição                       | Protegida? |
| --------------------- | -------- | --------------------------------- |:----------:|
| `/api/auth/register`  | `POST`   | Registra um novo usuário          |     Não    |
| `/api/auth/login`     | `POST`   | Autentica um usuário e retorna um token |     Não    |
| `/api/tasks`          | `POST`   | Cria uma nova tarefa              |     Sim    |
| `/api/tasks`          | `GET`    | Lista as tarefas do usuário logado |     Sim    |
| `/api/tasks/:id`      | `PUT`    | Atualiza uma tarefa específica    |     Sim    |
| `/api/tasks/:id`      | `DELETE` | Exclui uma tarefa específica      |     Sim    |

## 🔮 Possíveis Melhorias Futuras

-   [ ] Fazer o deploy do back-end e front-end em plataformas como Render e Vercel.
-   [ ] Adicionar funcionalidade para editar o título e descrição da tarefa.
-   [ ] Melhorar a UI/UX com uma biblioteca de componentes ou um framework CSS.
-   [ ] Implementar feedback ao usuário mais elegante (ex: toasts em vez de `alert()`).
-   [ ] Adicionar filtros para as tarefas (ex: por status).

## 👤 Autor

Feito  por Pedro Brum Vieira.

* **LinkedIn:** [https://www.linkedin.com/in/pedro-brum-vieira-68583b215/](https://www.linkedin.com/in/pedro-brum-vieira-68583b215/)
* **GitHub:** [https://github.com/pedrobvieira](https://github.com/pedrobvieira)

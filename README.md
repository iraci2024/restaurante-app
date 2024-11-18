# Restaurante App

Este é um aplicativo web completo para gerenciamento de restaurantes, incluindo um frontend em React, um backend em Node.js com Express, e um banco de dados MongoDB.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)
- MongoDB

## Configuração do Banco de Dados

1. Instale o MongoDB em sua máquina, se ainda não tiver instalado.
2. Inicie o serviço MongoDB:
   ```
   sudo service mongod start
   ```
3. Verifique se o MongoDB está rodando:
   ```
   mongo
   ```
   Se conseguir entrar no shell do MongoDB, está funcionando corretamente.

## Configuração do Backend

1. Navegue até a pasta do backend:
   ```
   cd /caminho/para/restaurante-app/backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:
   ```
   MONGODB_URI=mongodb://localhost:27017/restaurante-app
   JWT_SECRET=seu_segredo_jwt
   PORT=5000
   ```
   Substitua `seu_segredo_jwt` por uma string aleatória para ser usada como chave de criptografia.

4. Inicie o servidor backend:
   ```
   npm start
   ```
   O servidor deve iniciar na porta 5000.

## Configuração do Frontend

1. Navegue até a pasta principal do projeto:
   ```
   cd /caminho/para/restaurante-app
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento do React:
   ```
   npm start
   ```
   O aplicativo deve abrir automaticamente em seu navegador padrão. Se não abrir, acesse `http://localhost:3000`.

## Uso do Aplicativo

1. Registro de Usuário:
   - Clique em "Cadastrar" na página inicial.
   - Preencha o formulário com suas informações.
   - Clique em "Cadastrar" para criar sua conta.

2. Login:
   - Após o registro, você será redirecionado para a página de login.
   - Insira seu email e senha.
   - Clique em "Entrar".

3. Visualização do Cardápio:
   - Após o login, você verá o cardápio na página principal.
   - Você pode adicionar itens ao carrinho clicando em "Adicionar ao Carrinho".

4. Finalizar Pedido:
   - Vá para o carrinho clicando em "Carrinho" no menu superior.
   - Revise seus itens e clique em "Finalizar Pedido".
   - Confirme seu pedido na tela de checkout.

5. Visualizar Pedidos:
   - Clique em "Meus Pedidos" no menu superior para ver seus pedidos anteriores.

6. Painel de Administração (apenas para usuários admin):
   - Se sua conta for de administrador, você verá uma opção "Admin" no menu superior.
   - No painel de administração, você pode gerenciar o cardápio e visualizar todos os pedidos.

## Desenvolvimento

Para continuar o desenvolvimento deste projeto:

1. Clone o repositório:
   ```
   git clone https://github.com/iraci2024/restaurante-app.git
   ```

2. Siga as etapas de configuração do backend e frontend mencionadas acima.

3. Faça suas alterações no código.

4. Teste suas alterações localmente.

5. Commit e push suas alterações:
   ```
   git add .
   git commit -m "Descrição das suas alterações"
   git push origin master
   ```

## Suporte

Se você encontrar algum problema ou tiver alguma dúvida, por favor, abra uma issue no GitHub.

Boa sorte com seu projeto de restaurante!

# Frontend-Blogging

## Descrição

Este é o frontend de um blog escolar, desenvolvido como parte do desafio técnico do módulo 3 da pós-graduação em Tecnologia da FIAP. O projeto é destinado ao uso por professores e alunos.

## Experiência de Desenvolvimento

Durante o desenvolvimento, um dos principais desafios foi a integração com o backend e a configuração do ambiente de desenvolvimento utilizando Vite. A escolha do Vite como ferramenta de build e desenvolvimento se mostrou eficiente devido à sua rapidez e simplicidade. Além disso, a utilização de bibliotecas como Chakra UI e Formik facilitou a criação de uma interface de usuário moderna e responsiva.

## Arquitetura

O projeto segue uma arquitetura modular e escalável, utilizando as seguintes tecnologias e padrões:

- React: Biblioteca para construção de interfaces de usuário.
- Vite: Ferramenta de build e desenvolvimento rápida para projetos frontend.
- TypeScript: Superset do JavaScript que adiciona tipagem estática ao código.
- Chakra UI: Biblioteca de componentes de interface de usuário.
- Formik: Biblioteca para construção de formulários.
- Axios: Cliente HTTP para realizar requisições ao backend.
- Zod: Biblioteca de validação de esquemas para validação de dados.
- ESLint e Prettier: Ferramentas de linting e formatação de código para manter a consistência do código.
- Context API: Utilizado para gerenciamento de estado global da aplicação.

A estrutura do projeto é organizada da seguinte forma:

- src/: Contém todo o código fonte do projeto.
- components/: Contém os componentes reutilizáveis da interface de usuário.
- pages/: Contém as páginas da aplicação.
- services/: Contém os serviços para comunicação com o backend.
- layout/: Contém a estrutura de layout da aplicação.
- context/: Contém os contextos para gerenciamento de estado global.
- router.tsx: Componente principal da aplicação.
- main.tsx: Arquivo de entrada do projeto.

## Como Rodar o Projeto

1. Clone o repositório:

```bash
 git clone https://github.com/oc-garcia/fiap-postech-mod3.git
 cd fiap-postech-mod3
```

2. Instale as dependências:

```bash
 npm install
```

3. Crie um arquivo .env com as seguintes variáveis:

```bash
   VITE_API_URL=
```

4. Rodando em modo de desenvolvimento:

```bash
   npm run dev
```

5. Para construir o projeto:

```bash
   npm run build
```

## Rodando em Docker

1. Crie o container:

```bash
docker build -t app-name .
```

2. Rode o Container:

```bash
docker run -p 3000:3000 app-name
```

## Links Úteis

- Deploy da Aplicação: https://fiap-postech-mod3.vercel.app/ (INSTÂNCIA DO DB FOI RETIRADA APÓS AVALIAÇÃO DO PROJETO.)
- Repositório do Back-End: https://github.com/oc-garcia/fiap-postech-mod2

## ☕ Usando FIAP Blogging

<img src="src\assets\imgs\fiap-blog-home.png" alt="Página inicial do blog">

Siga as etapas abaixo para aproveitar ao máximo o FIAP Blogging:

### Visualizando Posts

Para ler um post completo, clique no ícone de 'olho' localizado no canto superior direito do card do post. Assim, você poderá visualizar todo o conteúdo do post.

### Cadastro

Para criar e editar posts, é necessário se cadastrar na plataforma. Clique no botão Sign Up para ser redirecionado(a) à página de cadastro:

<img src="src\assets\imgs\fiap-blog-cadastro.png" alt="Página de cadastro do blog">

Preencha os campos necessários e clique em Register para completar o cadastro.

### Login

Para acessar sua conta, clique no botão Log in, que irá levá-lo(a) à página de login:

<img src="src\assets\imgs\fiap-blog-login.png" alt="Página de login do blog">

Insira suas credenciais e clique em Login para acessar a plataforma.

### Pesquisando posts

Na página inicial, você pode utilizar a aba Search Posts para encontrar posts digitando palavras-chave do título. Os resultados aparecerão automaticamente:

<img src="src\assets\imgs\fiap-blog-search.png" alt="Página search do blog">

### Criando posts

Após fazer login, a aba Admin será liberada. Nela, você pode gerenciar a criação, edição e exclusão de posts.

Para criar um novo post, clique no botão Create Post:

<img src="src\assets\imgs\fiap-blog-botao-create.png" alt="Botao de Create">

### Editando posts

Para editar um post, vá até a aba Post Manager e clique no ícone de edição ao lado do post que deseja alterar:

<img src="src\assets\imgs\fiap-blog-editar.png" alt="Botão editar post">

### Excluindo posts

Para excluir um post, vá até a aba Post Manager e clique no ícone de lixeira ao lado do post que deseja remover:

<img src="src\assets\imgs\fiap-blog-excluir.png" alt="Botão excluir post">

### Informações de usuários

Na aba User Manager, você pode visualizar e gerenciar as informações dos usuários da plataforma.

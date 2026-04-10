# 🚀 Desafio Angular - Listagem de Usuários

Projeto desenvolvido como parte de um teste técnico, com o objetivo de demonstrar conhecimentos em Angular, organização de código, manipulação de estado e experiência do usuário.

A aplicação permite **listar, buscar, cadastrar e editar usuários**, com persistência de dados no navegador utilizando LocalStorage.

---

## 📌 Demonstração

🔗 Acesse o projeto online:
(Coloque aqui o link do seu GitHub Pages ou deploy)

---

## 🧠 Objetivo do Projeto

Desenvolver uma aplicação frontend utilizando Angular que simule um sistema de gerenciamento de usuários com foco em:

* Organização de código
* Boas práticas de desenvolvimento
* Experiência do usuário (UX)
* Persistência de dados no navegador

---

## 🛠️ Tecnologias utilizadas

* Angular
* TypeScript
* SCSS
* RxJS
* LocalStorage

---

## 📋 Funcionalidades

✔️ Listagem de usuários em formato de cards
✔️ Exibição de nome, e-mail, telefone e CPF
✔️ Busca por nome com debounce de 300ms
✔️ Cadastro de novos usuários
✔️ Edição de usuários existentes
✔️ Persistência dos dados mesmo após recarregar a página
✔️ Loading inicial ao carregar os usuários
✔️ Interface responsiva e organizada

---

## 📂 Estrutura do Projeto

```
src/
 ├── app/
 │   ├── core/
 │   │   └── services/
 │   │       └── users.service.ts
 │   ├── features/
 │   │   └── users/
 │   │       ├── user-list/
 │   │       ├── user-form/
 │   ├── app.routes.ts
 │   ├── app.config.ts
 │   └── app.component.ts
```

---

## ⚙️ Como instalar e executar o projeto

### 📌 Pré-requisitos

Antes de começar, você precisa ter instalado:

* Node.js (versão 16 ou superior recomendada)
* Angular CLI

Para instalar o Angular CLI:

```bash
npm install -g @angular/cli
```

---

### ▶️ Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/Jalesol/Desafio-Angular.git
```

2. Acesse a pasta do projeto:

```bash
cd Desafio-Angular
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o projeto:

```bash
ng serve
```

5. Abra no navegador:

```
http://localhost:4200/
```

---

## 💾 Persistência de dados

Os dados dos usuários são armazenados no **LocalStorage do navegador**, garantindo que:

* Os usuários não sejam perdidos ao recarregar a página
* O sistema funcione sem necessidade de backend

---

## 🔄 Simulação de API

O projeto utiliza dados mockados e simulação de carregamento para representar uma chamada real de API, incluindo:

* Delay de carregamento (loading)
* Tratamento de erros
* Estrutura preparada para futura integração com backend

---

## 🎯 Melhorias futuras

* Integração com API real
* Validação mais robusta de formulário
* Testes unitários
* Autenticação de usuários
* Paginação de dados

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Jales de Oliveira**

* Estudante de Sistemas de Informação
* Desenvolvedor Front-end
* Experiência com Angular, HTML, CSS e TypeScript

---

## 📄 Licença

Este projeto foi desenvolvido para fins de avaliação técnica e estudo.

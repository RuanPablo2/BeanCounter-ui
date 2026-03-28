# 📊 Financial Dashboard - Front-end (Angular)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Angular Material](https://img.shields.io/badge/Material-FF4081?style=flat&logo=angular&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat&logo=sass&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

🚀 **Live Demo:** [Acesse a aplicação em produção aqui](https://beancounter-ui.netlify.app/)

## 💻 Sobre o Projeto
Esta é a interface de usuário (SPA - Single Page Application) de um sistema de gestão financeira pessoal. Focado em usabilidade e performance, o painel oferece aos usuários uma visão clara de suas finanças, permitindo o gerenciamento completo de receitas e despesas.

**Nota de Arquitetura:** Este projeto consome uma API RESTful desenvolvida em **Java com Spring Boot**. O código-fonte do back-end pode ser encontrado no repositório dedicado da API.

## ✨ Destaques Técnicos do Front-end
Este projeto foi construído utilizando as melhores práticas do ecossistema Angular moderno:
* **Autenticação e Segurança:** Fluxo completo de Login e Registro de usuários, com proteção de rotas (Route Guards) e gerenciamento de sessão via Token JWT.
* **Arquitetura Standalone:** Utilização de Standalone Components, dispensando o uso de `NgModules` para um código mais limpo e modular.
* **Angular Material:** UI consistente e acessível utilizando modais flutuantes (`MatDialog`), tabelas interativas (`MatTable`) e seletores de data (`MatDatepicker`).
* **Filtros Inteligentes (Client-side):** * Busca em tempo real na tabela (sem sobrecarregar o back-end) usando `MatTableDataSource`.
  * Filtro por período específico via Date Range Picker.
* **Theme Management (Dark Mode):** Sistema de temas dinâmico (Claro/Escuro) utilizando SCSS nativo e persistência de preferência de usuário via `localStorage`.
* **Reactive Forms:** Formulários reativos na tela de registro, login e nas transações, com validações síncronas para garantir a integridade dos dados antes do envio à API.

## 📸 Screenshots

### 🔐 Autenticação (Login e Registro)
<img width="553" height="542" alt="image" src="https://github.com/user-attachments/assets/8cf1ccd4-fdfd-4f73-ad55-34736f0e3d5a" />
<img width="547" height="622" alt="image" src="https://github.com/user-attachments/assets/670f5d38-4b70-455d-89a9-3bb0ad1b5a1e" />

### ☀️ Dashboard - Light Mode
<img width="1304" height="766" alt="image" src="https://github.com/user-attachments/assets/f4e5b23d-76f2-4d96-8b26-bfd87f38311a" />

### 🌙 Dashboard - Dark Mode
<img width="1252" height="745" alt="image" src="https://github.com/user-attachments/assets/77dcc5c3-7090-46bb-8360-9c173589624c" />

### ⚙️ Interações (Modal e Filtros)
<img width="1238" height="735" alt="image" src="https://github.com/user-attachments/assets/451f3ac5-3d94-4226-ba39-577b90527fb0" />
<img width="1230" height="731" alt="image" src="https://github.com/user-attachments/assets/8f84f325-b722-42b4-8a35-3073bc80b669" />

## 🛠️ Stack Tecnológica
* **Framework:** Angular 18
* **Linguagem:** TypeScript
* **Estilização:** SCSS (Sass)
* **Biblioteca de UI:** Angular Material
* **Gerenciamento de Estado/Requisições:** RxJS
* **Deploy/CI-CD:** Netlify

## 🚀 Como executar o projeto localmente

### Pré-requisitos
* Node.js (v18 ou superior)
* Angular CLI (`npm install -g @angular/cli`)

### Instalação e Execução
```bash
# Clone este repositório
git clone https://github.com/RuanPablo2/BeanCounter-ui

# Acesse a pasta do projeto
cd pasta-do-projeto

# Instale as dependências
npm install

# Inicie o servidor local
ng serve

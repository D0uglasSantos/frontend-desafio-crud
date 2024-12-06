# **Athlete & Event Management System**

Este projeto é um sistema de gerenciamento de atletas e eventos, desenvolvido com **React** no frontend e **Node.js/Express** no backend.

---

## 🚀 **Demonstração**

- **Frontend**: [🌐 Link para o frontend no Vercel](https://challenger-crud.vercel.app/)  
- **Backend API**: [🌐 Link para o backend no Render](https://backend-desafio-crud.onrender.com)  
  ➡ Para buscar atletas ou eventos, adicione `/api/atletas` ou `/api/eventos` no final da URL.  

---

## 📂 **Estrutura do Projeto**

O projeto está dividido em dois repositórios principais:

1. **Backend**  
   Repositório: [`backend-desafio-crud`](https://github.com/D0uglasSantos/backend-desafio-crud/tree/main)  
   Contém o servidor **Node.js/Express** e a API.  

2. **Frontend**  
   Repositório: [`frontend-desafio-crud`](https://github.com/D0uglasSantos/frontend-desafio-crud)  
   Contém a aplicação **React**.

---

## 🛠 **Tecnologias Utilizadas**

### **Backend**
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**

### **Frontend**
- **React**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **shadcn/ui**

---

## 💻 **Configuração e Execução Local**

### **Backend**

1. Clone o repositório:  
   ```bash
   git clone https://github.com/D0uglasSantos/backend-desafio-crud/tree/main

2. Instale as dependências:  
   ```bash
   npm install

3. Crie um arquivo .env na raiz do diretório e adicione suas variáveis de ambiente:  
   ```bash
   MONGODB_URI=sua_uri_do_mongodb
   PORT=5000

4. Inicie o servidor: 
   ```bash
   npm run dev

O servidor estará rodando em:
http://localhost:5000


---

### **Frontend**

1. Clone o repositório:  
   ```bash
   git clone https://github.com/D0uglasSantos/frontend-desafio-crud

2. Instale as dependências:
   ```bash
   npm install

3. Crie um arquivo .env na raiz do diretório e adicione a URL do backend:
   ```bash
   REACT_APP_API_URL=http://localhost:5000

4. Inicie a aplicação:  
   ```bash
   npm run dev

O servidor estará rodando em:
http://localhost:3000

---

## 🌐 **Deploy**

### **Backend (Render)**

1. Crie uma conta no Render.
2. No dashboard, crie um novo Web Service.
3. Conecte o repositório GitHub e selecione o branch do backend.
4. Configure as variáveis de ambiente necessárias.
5. Faça o deploy! 🎉

### **Frontend (Vercel)**

1. Crie uma conta no Vercel.
2. No dashboard, importe o projeto do GitHub.
3. Selecione o repositório e o branch do frontend.
4. Configure as variáveis de ambiente necessárias.
5. Faça o deploy! 🚀

## ⚙ **Funcionalidades**

1. Gerenciamento de Atletas (CRUD)
2. Gerenciamento de Eventos (CRUD)
3. Interface responsiva e amigável.

## 📜 **Licença**

Este projeto está licenciado sob a licença MIT.

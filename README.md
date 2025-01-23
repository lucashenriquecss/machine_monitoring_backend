# API RESTful de Gerenciamento de Máquinas

Este projeto é uma API RESTful para gerenciar máquinas industriais, permitindo o cadastro, consulta e atualização de dados de telemetria em tempo real. 

## 🚀 Funcionalidades

1. **Cadastro de Máquinas**  
   - Cada máquina possui os seguintes atributos:
     - Identificador único (UUID ou gerado automaticamente).
     - Nome da máquina.
     - Localização (coordenadas ou nome do local).
     - Status atual (operando, parada para manutenção, desligada).

2. **Atualização de Dados de Telemetria**  
   - Endpoint para atualizar a localização e o status da máquina.
   - Suporte para atualização em tempo real utilizando **WebSockets**.

3. **Consulta de Máquinas**  
   - Listar todas as máquinas cadastradas.
   - Filtrar máquinas pelo status (operando, manutenção, desligada).

4. **Simulação de Dados de Telemetria**  
   - Geração automática de dados de telemetria (ex.: status e localização) a cada 5 segundos.

---

## 🛠 Ferramentas e Tecnologias

- **Backend**: Node.js, NestJS, Express.js
- **Banco de Dados**: PostgreSQL (utilizando TypeORM)
- **WebSockets**: `@nestjs/websockets` ou `socket.io`
- **Simulação de Telemetria**: Scheduler (`setInterval` ou biblioteca `node-schedule`)
- **Documentação**: Swagger (OpenAPI)
- **Testes**: Jest, Supertest
- **Gerenciamento de Dependências**: npm ou yarn

---

## 🎯 Objetivos do Projeto

- Proporcionar uma API escalável e robusta para o gerenciamento de máquinas industriais.
- Permitir atualizações de status e localização em tempo real.
- Fornecer uma interface para monitoramento de máquinas e telemetria.

---

## 🚀 Como Iniciar o Projeto

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

1. **[Node.js](https://nodejs.org/)**
   - Download: [https://nodejs.org/](https://nodejs.org/)
   - Comando CLI para verificar a instalação:
     ```bash
     node -v
     ```

2. **[NestJS CLI](https://docs.nestjs.com/cli/overview)**
   - Instale o CLI do NestJS globalmente:
     ```bash
     npm install -g @nestjs/cli
     ```
   - Comando CLI para verificar a instalação:
     ```bash
     nest --version
     ```

3. **[PostgreSQL](https://www.postgresql.org/)**
   - Download: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
   - Comando CLI para verificar a instalação:
     ```bash
     psql --version
     ```

---

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/api-gestao-maquinas.git
   cd api-gestao-maquinas

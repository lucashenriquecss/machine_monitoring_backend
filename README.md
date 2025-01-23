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
   - Geração automática de dados de telemetria (ex.: status e localização) a cada 5 segundos, usando scheduler.
   - 
5. **Extras**  
   - Autênticação de usuário.
   - Logs de atualização de maquinas.
---

## 🛠 Ferramentas e Tecnologias

- **Backend**: Node.js, NestJS
- **Banco de Dados**: PostgreSQL (utilizando TypeORM)
- **WebSockets**: `@nestjs/websockets`
- **Simulação de Telemetria**: Scheduler 
- **Documentação**: Swagger (OpenAPI)
- **Gerenciamento de Dependências**: npm

---

## 🎯 Objetivos do Projeto

- Proporcionar uma API escalável e robusta para o gerenciamento de máquinas industriais.
- Permitir atualizações de status e localização em tempo real.
- Fornecer uma interface para monitoramento de máquinas e telemetria.

---

## 🎯 Proximas atualizações

- Verificação de temperatura e RPM das maquinas.
- Envio de e-mail para recuperação de senha e validação de e-mail do usuário.
- Melhoria na simulação da telemetria.

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
   git clone https://github.com/lucashenriquecss/machine_monitoring_backend.git
   
2. Instalar dependências:

   ```bash
   npm install

3. Crie um arquivo .env na raiz do projeto:
   #Gere uma JWT Secret [https://jwtsecret.com/generate] e coloque em ACCESS_TOKEN_SECRET_KEY
   Segue o exemplo de configuração
   ```bash
      DB_HOST="localhost"
      DB_PORT="5432"
      DB_USERNAME="login"
      DB_PASSWORD="senha"
      DB_DATABASE="nome_da_base"
      ACCESS_TOKEN_SECRET_KEY="31f6a15c4ddc088d3ab214bd3d98f4c6f8eb246d835d2fe573f17135a130bfad"
      ACCESS_TOKEN_EXPIRE_TIME=

4. Iniciar servidor
   ```bash
   npm run start:dev

### Documentação
http://localhost:3000/apidocs



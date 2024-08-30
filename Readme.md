<h1 align="center">Service Management API</h1>

<h4>Glossário</h4>

- O que é possivel fazer?
- Como rodar o projeto no seu computador?
- API ENDPOINTS
- Tecnologias Utilizadas
- Diagrama do banco de dados

## Como ver o funcionamento deste projeto?

**Para ter um melhor entendimento e ver o funcionamento de forma oficial acesse [Service Management - Front-end](https://github.com/joseVitor03/Service-Management-Front-End)**


## O que é possivel fazer?

**Service Management API é uma API Restful para gerenciar serviços em uma oficina mecânica para automóveis. Nela, o administrador tem acesso a informações sobre clientes, funcionários e serviços de forma rápida e simples.**

## Como rodar este projeto no seu computador?

Para rodar este projeto localmente, é necessário atender alguns requisitos.

<details>
    <summary><b>Pré-requisitos:</b></summary>

- Ter no mínimo 10GB livres no seu sistema.
- Ter o Git instalado em seu terminal. **[link](https://github.com/git-guides/install-git)**
- Ter uma chave SSH atrelada à sua conta no GitHub. [**link**](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- Ter o Docker instalado em sua máquina na versão mais recente. Para instalar o Docker, acesse este [**link**](https://www.docker.com/).

</details>


**Para rodar o projeto localmente, siga estes passos:**

Clone o projeto

```bash
# Com SSH
$ git@github.com:joseVitor03/Service-Management-API.git

# Com HTTP
$ https://github.com/joseVitor03/Service-Management-API.git
```

Mude para a pasta raiz:

```bash
$ cd Service-Management-API
```

Instale as dependências do projeto:
```bash
$ npm install
```

<aside>
⚠️ Existe um arquivo `.env.example` na pasta frontend e na backend. Nele, você pode ver quais variáveis de ambiente são utilizadas no projeto.
Crie um arquivo `.env` com essas mesmas variáveis e atribua os valores que achar desejar.

</aside>


Faça o `build` da aplicação pelo Docker:

```bash
$ docker-compose up -d --build
```
Com esse comando as portas:
`http://localhost:3001`e `http://localhost:3306` estarão ocupadas com o oficina_api e oficina_db respectivamente.

Após inserir os valores no .env, faça esses comandos para criar as tabelas, fazer as migrações e seeders:
```bash
$ docker exec -it oficina_api sh
```
Dessa maneira você vai acessar o container `oficina_api` 

Após acessá-lo rode esse comando:
```bash
$ npm run db:reset
```

## 📍API ENDPOINTS
⚠️**Para usar todas rotas o usuário precisa adicionar o token recebido na /login e utilizá-la no Headers com o nome Authorization e inserir o valor `Bearer #valorToken`**

⚠️**A única que foge dessa observação acima é a rota /login**
### Rotas para Administradores:



| rotas              | descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /login</kbd>  | autenticar o usuário [request-details](#post-login-req)
| <kbd>POST /admin</kbd>     | adicionar novo administrador [request details](#post-admin-req)
| <kbd>DELETE /admin</kbd> | remover administrador [request details](#delete-admin)

<details>
    <sumary><h3>Solicitações e Respostas das rotas de admin</h3></sumary>

<h4 id="post-login-req">POST /login</h4>

##### REQUEST:
```json
{
  "email": "exaple@gmail.com",
  "password": "Ab12345678@"
}

```
##### RESPONSE:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp2NjgxMDMzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiSnY5ODIyNzQ0OUAiLCJpYXQiOjE3MjQ5NzExNzMsImV4cCI6MTcyNTA1NzU3M30.hsmXyzDUl3Tot55VbpitHvbSAWBhO1yjXSUruIjKAtI"
}

```

<h4 id="post-admin-req">POST /admin</h4>

##### REQUEST:
```json
{
  "email": "example@gmail.com",
  "password": "Ab12345678@"
}

```
##### RESPONSE:
```json
{
  "id": 3,
  "email": "example@gmail.com",
  "password": "$2a$12$9bxR8BM/dia2.kDi57JRdex8EZtBOJYtQsN7KRLnpNwUZ0EmV2eJC"
}
```

<h4 id="delete-admin">DELETE /admin</h4>

##### REQUEST:
```json
{
  "email": "exaple@gmail.com",
}

```
##### RESPONSE:
```json
{
  "message": "Admin removido do sucesso"
}
```
</details>

### Rotas para Itens:
| rotas              | descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /itens</kbd> | listar itens [response-details](#get-list-itens)
| <kbd>GET /itens/findItens?name=</kbd>  | encontra itens através do nome do item. Usando a query `name` [request-details](#find-itens)
| <kbd>POST /itens</kbd> | cadastrar um novo item [request-details](#insert-item)
| <kbd>DELETE /itens/:id</kbd>  | deletar item [request-details](#delete-item)
| <kbd>PATCH /itens</kbd> | atualizar item [request-details](#update-item)
<details>
<sumary><h3>Solicitações e Respostas das rotas de itens</h3></sumary>

<h4 id="#get-list-itens">GET /itens</h4>

##### RESPONSE:
```json
[{
    "id": 1,
    "name": "OLEO 15W40"
  },
  {
    "id": 2,
    "name": "OLEO 5W30"
  },
  {
    "id": 3,
    "name": "OLEO 0W20"
  },
  {
    "id": 4,
    "name": "OLEO DE CAMBIO"
  }]
```

<h4 id="find-itens">GET /itens/findItens?name=filtro</h4>

##### RESPONSE:
```json
[
  {
    "id": 16,
    "name": "FILTRO DE ÓLEO"
  },
  {
    "id": 17,
    "name": "FILTRO DE AR"
  },
  {
    "id": 48,
    "name": "FILTRO DE COMBUSTÍVEL"
  }
]
```

<h4 id="insert-item">POST /itens</h4>

#### REQUEST:
```json
{
  "name": "cabeçote"
}
```

#### RESPONSE:
```json
{
  "id": 38,
  "name": "CABEÇOTE"
}
```

<h4 id="delete-item">DELETE /itens</h4>

#### REQUEST:
```json
{
  "id": 38,
  "name": "CABEÇOTE"
}
```

#### RESPONSE:
```json
{
  "message": "Item excluído com sucesso."
}
```

<h4 id="update-item">PATCH /itens/2</h4>

#### REQUEST:
```json
{
  "name": "COXIM"
}
```

#### RESPONSE:
```json
{
  "id": 2,
  "name": "COXIM"
}
```
</details>
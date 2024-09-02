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
`http://localhost:3001`e `http://localhost:(escolhida no .env)` estarão ocupadas com o oficina_api e oficina_db respectivamente.

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
##### RESPONSE:W
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

<h4 id="get-list-itens">GET /itens</h4>

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

### Rotas para Carros:

| rotas       | descrição      
|-------------------|----------------------
| <kbd>GET /cars</kbd>  | listando carros [response-details](#list-cars)
| <kbd>GET /cars/findCars?name=</kbd>  | encontrar carros pelo nome. Usando a query `name` [response-details](#find-cars)
|<kbd>POST /cars/brand</kbd>  | encontrar carros pela marca [request-details](#find-cars-brand)
|<kbd>POST /cars</kbd>  | cadastrar carro [request-details](#insert-car)
|<kbd>DELETE /cars/:id</kbd>  | deletando carro [response-details](#delete-car)
|<kbd>PUT /cars/:id</kbd>  | atualizando carro [request-details](#update-car)

<details>
<sumary>Solicitações e Respostas das rotas de carros</sumary>

<h4 id="list-cars">GET /cars</h4>

#### RESPONSE:
```json
[
  {
    "id": 1,
    "name": "HONDA CIVIC",
    "year": 2020,
    "brand": "HONDA"
  },
  {
    "id": 2,
    "name": "PALIO",
    "year": 2015,
    "brand": "FIAT"
  },
  {
    "id": 3,
    "name": "VOLKSWAGEN GOL",
    "year": 2024,
    "brand": "VOLKSWAGEN"
  }]
```
<h4 id="find-cars">GET /cars/findCars?name=fi</h4>

#### RESPONSE:
```json
[{
    "id": 34,
    "name": "FORD FIESTA",
    "year": 2024,
    "brand": "FORD"
  },
  {
    "id": 64,
    "name": "HONDA FIT",
    "year": 2024,
    "brand": "HONDA"
  },
  {
    "id": 90,
    "name": "NISSAN PATHFINDER",
    "year": 2024,
    "brand": "NISSAN"
  }]
```
<h4 id="find-cars-brand">POST /cars/brand</h4>

#### REQUEST:
```json
{
  "brand": "HONDA"
}
```
#### RESPONSE:
```json
[
  {
    "id": 1,
    "name": "HONDA CIVIC",
    "year": 2020,
    "brand": "HONDA"
  },
  {
    "id": 63,
    "name": "HONDA CIVIC",
    "year": 2024,
    "brand": "HONDA"
  },
  {
    "id": 64,
    "name": "HONDA FIT",
    "year": 2024,
    "brand": "HONDA"
  }]
```

<h4 id="insert-car">POST /cars</h4>

#### REQUEST:
```json
{
  "name": "GOLF",
  "brand": "VOLKSWAGEN",
  "year": 2020
}
```

#### RESPONSE:
```json
{
  "id": 103,
  "name": "GOLF",
  "brand": "VOLKSWAGEN",
  "year": 2020
}
```

<h4 id="delete-car">DELETE /cars/2</h4>

#### RESPONSE:
```json
{
  "message": "carro excluído"
}
```

<h4 id="update-car">PUT /cars/2</h4>

#### REQUEST:
```json
{
  "name": "GOLF",
  "brand": "VOLKSWAGEN",
  "year": 2020
}
```

#### RESPONSE:
```json
{
  "id": 2,
  "name": "GOLF",
  "brand": "VOLKSWAGEN",
  "year": 2020
}
```

</details>


### Rotas para Funcionários:

| rotas    | descrição          
|----------------|-----------------
| GET /employees   | lista de funcionários [response-details](#list-employees)
| GET /employees/:id/services  | lista de serviços do funcionário [response-details](#list-services-by-employee)
| POST /employees  | cadastrar funcionário [request-details](#insert-employee)
| POST /employees/:employeeId/services  | lista de serviços do funcionário em um intervalo de datas [request-details](#list-services-by-employee-in-date-range)
| DELETE /employees/:id  | "excluir" funcionário [response-details](#delete-employee)
| PATCH /employees/:id   | atualizar nome do funcionário [request-details](#update-employee)

<details>
<sumary>Solicitações e Respostas das rotas de funcionários</sumary>

<h4 id="list-employees">GET /employees</h4>

#### RESPONSE:
```json
[
  {
    "id": 1,
    "name": "FABIO"
  },
  {
    "id": 2,
    "name": "LEANDRO"
  }
]
```

<h4 id="list-services-by-employee">GET /employees/1/services</h4>

#### RESPONSE:
```json
[
  {
    "labor": "500.00",
    "description": null,
    "service": {
      "id": 2,
      "totalService": "1750.00",
      "date": "2024-04-20",
      "paymentStatus": false,
      "principalEmployeeId": 1,
      "client": {
        "id": 2,
        "name": "Ciclano",
        "phone": "98765-4321",
        "carColor": "Vermelho",
        "plate": "XYZ-9A87",
        "car": {
          "id": 2,
          "name": "PALIO",
          "year": 2015,
          "brand": "FIAT"
        }
      }
    }
  }
]
```

<h4 id="insert-employee">POST /employees</h4>

#### REQUEST:
```json
{
  "name": "cleber"
}
```

#### RESPONSE:
```json
{
  "id": 3,
  "name": "CLEBER",
  "active": true
}
```

<h4 id="list-services-by-employee-in-date-range">POST /employees/1/services</h4>

#### REQUEST:
```json
{
  "dateInitial": "2024-01-10",
  "dateFinal": "2024-06-20"
}
```

#### RESPONSE
```json
[
  {
    "labor": "500.00",
    "description": "MÃO DE OBRA",
    "service": {
      "id": 2,
      "date": "2024-04-20",
      "client": {
        "id": 2,
        "name": "Ciclano",
        "carColor": "Vermelho",
        "plate": "XYZ-9A87",
        "car": {
          "id": 2,
          "name": "PALIO",
          "year": 2015,
          "brand": "FIAT"
        }
      }
    },
    "employee": {
      "id": 1,
      "name": "FABIO"
    }
  }
]
```

<h4 id="delete-employee">DELETE /employees/1</h4>

#### RESPONSE
```json
{
  "message": "funcionário excluído."
}
```

<h4 id="update-employee">PATCH /employees/2</h4>

#### REQUEST:
```json
{
  "name": "leandro"
}
```

#### RESPONSE:
```json
{
  "id": 2,
  "name": "Leandro"
}
```

</details>

### Rotas para Clientes:

|  rotas    | descrição           
|-------------|------------------
| GET /clients   | listar clientes [response-details](#list-clients)
| GET /clients/:id   | encontrar cliente pelo id [response-details](#get-client)
| POST /clients   | cadastrar cliente [request-details](#insert-client)
| POST /clients/findClient  | encontrar cliente pelo nome e/ou placa [request-details](#find-client-by-name-our-plate)
| DELETE /clients/:id  | deletar cliente [response-details](#delete-client)
| PUT /clients/:id  | atualizar dados do cliente [request-details](#update-client)

<details>
<sumary>Solicitações e Respostas das rotas de clientes</sumary>

<h4 id="list-clients">GET /clients</h4>

#### RESPONSE:
```json
[
  {
    "id": 1,
    "name": "Fulano",
    "phone": "12345-6789",
    "carColor": "Azul",
    "plate": "ABC-1B23",
    "car": {
      "id": 1,
      "name": "HONDA CIVIC",
      "year": 2020,
      "brand": "HONDA"
    }
  },
  {
    "id": 2,
    "name": "Ciclano",
    "phone": "98765-4321",
    "carColor": "Vermelho",
    "plate": "XYZ-9A87",
    "car": {
      "id": 2,
      "name": "PALIO",
      "year": 2015,
      "brand": "FIAT"
    }
  }
]
```
<h4 id="get-client">GET /clients/1</h4>

```json
{
  "id": 1,
  "name": "Fulano",
  "phone": "12345-6789",
  "carId": 1,
  "carColor": "Azul",
  "plate": "ABC-1B23",
  "car": {
    "id": 1,
    "name": "HONDA CIVIC",
    "year": 2020,
    "brand": "HONDA"
  }
}
```

<h4 id="insert-client">POST /clients</h4>

#### REQUEST:
```json
{
  "name": "Cleber",
  "carId": 4,
  "plate": "MCH3B23",
  "phone": "12 34567-8901",
  "carColor": "PRATA"
}
```

#### RESPONSE:
```json
{
  "id": 4,
  "name": "CLEBER",
  "phone": "12 34567-8901",
  "carColor": "PRATA",
  "plate": "MCH-3B23",
  "car": {
    "id": 4,
    "name": "VOLKSWAGEN VOYAGE",
    "year": 2024,
    "brand": "VOLKSWAGEN"
  }
}
```

<h4 id="find-client-by-name-our-plate">POST /clients/findClient</h4>

#### REQUEST:
```json
{
  "name": "",
  "plate": "X"
}
```
#### RESPONSE:
```json
[
  {
    "id": 2,
    "name": "Ciclano",
    "phone": "12 98765-4321",
    "carColor": "Vermelho",
    "plate": "XYZ-9A87",
    "car": {
      "id": 2,
      "name": "PALIO",
      "year": 2015,
      "brand": "FIAT"
    }
  }
]
```

<h4 id="delete-client">DELETE /clients/1</h4>

#### RESPONSE:
```json
{
  "message": "cliente excluído"
}
```

<h4 id="update-client">PUT /clients/2</h4>

#### REQUEST:
```json
{
  "name": "ana maria",
  "carId": 1,
  "plate": "MCH-1A23",
  "phone": "12 34568-9102",
  "carColor": "PRATA"
}
```

#### RESPONSE:
```json
{
  "id": 1,
  "name": "ana maria",
  "phone": "12 34568-9102",
  "plate": "MCH-1A23",
  "carId": 1,
  "carColor": "PRATA"
}
```

</details>

### Rotas para Serviços

|  rotas   | descrição       
|----------------|-----------------
| GET /services/paymentStatusFalse  | lista de serviços com pagamento pendente [response-details](#list-services-false)
| GET /services/paymentStatusTrue  | lista de serviços com pagamento efetuado [response-details](#list-services-true)
| GET /services/:id  | detalhes de um serviço [response-details](#find-service)
| POST /services   | cadastrar serviço. Pode fazer o cadastro com o `employeeServices` ou o `itens` com o array vázio, mas não os dois. [request-details](#insert-service)
| PATCH /services/:id  | atualizar status de pagamento do serviço. [request-details](#update-service)
| DELETE /services/:id  | deletar serviço [response-details](#delete-service)

<details>
<sumary>Solicitações e Respostas das rotas de serviços</sumary>

<h4 id="list-services-false">GET /services/paymentStatusFalse</h4>

#### RESPONSE
```json
[
  {
    "id": 2,
    "totalService": "1750.00",
    "date": "2024-04-20",
    "paymentStatus": false,
    "client": {
      "id": 2,
      "name": "Ciclano",
      "phone": "98765-4321",
      "carColor": "Vermelho",
      "plate": "XYZ-9A87",
      "car": {
        "id": 2,
        "name": "PALIO",
        "year": 2015,
        "brand": "FIAT"
      }
    },
    "principalEmployee": {
      "id": 1,
      "name": "FABIO",
      "active": true
    }
  }
]
```

<h4 id="list-services-true">GET /services/paymentStatusTrue</h4>

#### RESPONSE
```json
[
  {
    "id": 1,
    "totalService": "750.00",
    "date": "2024-05-19",
    "paymentStatus": true,
    "client": {
      "id": 1,
      "name": "Fulano",
      "phone": "12345-6789",
      "carColor": "Azul",
      "plate": "ABC-1B23",
      "car": {
        "id": 1,
        "name": "HONDA CIVIC",
        "year": 2020,
        "brand": "HONDA"
      }
    },
    "principalEmployee": {
      "id": 2,
      "name": "LEANDRO",
      "active": true
    }
  }
]
```
<h4 id="find-service">GET /services/1</h4>

#### RESPONSE:
```json
{
  "employees": [
    {
      "labor": "250.00",
      "description": "MÃO DE OBRA",
      "employee": {
        "id": 1,
        "name": "FABIO"
      }
    },
    {
      "labor": "250.00",
      "description": "ALINHAMENTO DE CABEÇOTE",
      "employee": {
        "id": 2,
        "name": "LEANDRO"
      }
    }
  ],
  "itens": [
    {
      "id": 1,
      "name": "OLEO 15W40",
      "qtdUnit": 2,
      "priceUnit": "125.00"
    }
  ],
  "basicServiceData": {
    "id": 1,
    "totalService": "750.00",
    "date": "2024-05-19",
    "paymentStatus": true,
    "client": {
      "id": 1,
      "name": "Fulano",
      "phone": "12345-6789",
      "carColor": "Azul",
      "plate": "ABC-1B23",
      "car": {
        "id": 1,
        "name": "HONDA CIVIC",
        "year": 2020,
        "brand": "HONDA"
      }
    },
    "principalEmployee": {
      "id": 2,
      "name": "LEANDRO"
    }
  }
}
```

<h4 id="insert-service">POST /services</h4>

#### REQUEST:
```json
{
  "clientId": 2,
  "totalService": 800,
  "date": "2024-03-19",
  "paymentStatus": false,
  "principalEmployeeId": 2,
  "itens": [
    {
      "qtdUnit": 2,
      "priceUnit": 100,
      "itemId": 2
    }],
  "employeeServices": []
}
```
#### RESPONSE:
```json
{
  "message": "serviço registrado."
}
```

<h4 id="update-service">PATCH /services/1</h4>

#### REQUEST:
```json
{
  "paymentStatus": true
}
```
#### RESPONSE:
```json
{
  "message": "status do serviço atualizado."
}
```

<h4 id="delete-service">DELETE /services/2</h4>

#### RESPONSE:
```json
{
  "message": "serviço deletado."
}
```

</details>

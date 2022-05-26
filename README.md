<h1 align="center">
  Teste Tag
</h1>

<div align="center">
  <a href="#backend">Backend</a>
  <a href="#endpoints">Endpoints</a>
  <a href="#frontend">Frontend</a>
</div>

# **Backend**

## **Instruções**

Para rodar a api é necessário criar um arquivo .env dentro da pasta backend com os seguintes valores:

    PGPORT=Porta onde está rodando o postgres, por padrão é a porta 5432
    POSTGRES_USER=Usuário do postgres
    POSTGRES_PASSWORD=Senha do usuário
    POSTGRES_DB=Nome do DB que será utilizado
    SECRET_KEY=Chave utilizada para a criação dos tokens de validação
    EXPIRES_IN=Tempo que os tokens levam para expirar
    CLOUDINARY_CLOUD_NAME=Nome da nuvem do Cloudinary onde serão salvas as fotos.
    CLOUDINARY_API_KEY=Chave da API do Cloudinary
    CLOUDINARY_API_SECRET=Senha da API do Cloudinary

Há um arquivo .env.example que pode ser usado para iniciar a criação do .env.

Após preencher as informações do .env, é necessário rodar o comando `yarn typeorm migration:run` dentro da pasta backend. Isso fará com que o banco de dados seja criado e que seja populado com um usuário e com algumas categorias.

Para rodar o servidor, basta entrar na pasta backend e digitar o comando `yarn dev`, isso fará com que o servidor rode na porta 3333 do localhost por padrão.

## **Endpoints**

A API tem um total de 6 endpoints, voltados principalmente para os produtos. <br/>

## Rota que não precisam de autenticação

<h2 align ='center'> Products </h2>

`GET /products - FORMATO DA REQUISIÇÃO`

Não é necessário passar corpo na requisição.
Caso dê tudo certo, a resposta será assim:

`GET /products - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "26de7fde-82cd-46f2-8a99-a1a207d7c81a",
    "name": "AMD FX-6300",
    "status": "a",
    "created": "2022-05-24T08:44:22.669Z",
    "imageUrl": "http://res.cloudinary.com/dtokszyyg/image/upload/v1653498182/pwuja8fgueolmv5hlvyoit.jpg",
    "category": {
      "id": "a04dc183-d08b-445e-9c96-d685b654c721",
      "name": "eletronics"
    }
  },
  {
    "id": "2e2f673d-36c7-4a4c-926b-e5f322471b8e",
    "name": "Webcam",
    "status": "d",
    "created": "2022-05-24T08:44:22.669Z",
    "imageUrl": "http://res.cloudinary.com/dtokszyyg/image/upload/v1653517135/ootuhadd5ihvfvcn4jfpbouu.jpg",
    "category": {
      "id": "a04dc183-d08b-445e-9c96-d685b654c721",
      "name": "eletronics"
    }
  }
]
```

---

<h2 align ='center'> Categories </h2>

`GET /categories - FORMATO DA REQUISIÇÃO`

Não é necessário passar corpo na requisição.
Caso dê tudo certo, a resposta será assim:

`GET /categories - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "a04dc183-d08b-445e-9c96-d685b654c721",
    "name": "eletronics"
  },
  {
    "id": "dc5441b1-205f-429a-ab61-4d6ef56cb9f6",
    "name": "beauty"
  },
  {
    "id": "b2a2e862-562c-4331-98bc-de49a3a5516f",
    "name": "music"
  }
]
```

---

<h2 align ='center'> Login </h2>

`POST /login - FORMATO DA REQUISIÇÃO`

É necessário passar um e-mail e senha para que seja realizado o login. O banco de dados já vem com um usuario cadastrado com as seguintes credenciais:

```json
{
  "email": "admin@admin.com",
  "password": "admin123"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ2ZmEzNGNkLTVkMmItNGQ1Zi04MjcxLThlY2EwNzIzNDBkZCIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJhZG1pbjEyMyIsImlhdCI6MTY1MzUyMDUzNiwiZXhwIjoyNDUzNTIwNTM2fQ.GX0C32isKCJYbAqsXtE4Jwcp-XaPdB19uces9FPqfgY"
}
```

## Rotas que precisam de autenticação

Rotas que necessitam de autorização deverão possuir no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

`POST /products - FORMATO DA REQUISIÇÃO`

Rota para criação de um novo produto. As requisições deve ser feitas com os dados de um multipart/formdata. Os seguintes campos são necessários:

```json
{
  "name": "Nome do novo produto.",
  "category": "Nome da categoria ao qual o produto pertencerá. Deve ser uma categoria já existente.",
  "status": "Status do produto podendo ser 'a' | 'i' | 'd'.",
  "image": "Arquivo de imagem do produto."
}
```

Caso dê tudo certo, a resposta será assim:

`POST /products - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "message": "product created"
}
```

`PATCH /products/{id} - FORMATO DA REQUISIÇÃO`

Rota para edição de um produto. O id do produto a ser alterado deve ser passado pela url. As requisições deve ser feitas com os dados de um multipart/formdata. Pode ter qualquer um dos seguintes campos:

```json
{
  "name": "Nome do novo produto.",
  "category": "Nome da categoria ao qual o produto pertencerá. Deve ser uma categoria já existente.",
  "status": "Status do produto podendo ser 'a' | 'i' | 'd'.",
  "image": "Arquivo de imagem do produto."
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /products/{id} - FORMATO DA RESPOSTA - STATUS 204 - NO CONTENT`

`DELETE /products - FORMATO DA REQUISIÇÃO`

Rota para remover produtos do banco de dados. As requisições deve ser feitas com um body contendo os ids a serem deletados, sendo possível deletar mais de um produto de uma vez.

```json
{
  "ids": [
    "26de7fde-82cd-46f2-8a99-a1a207d7c81a",
    "2e2f673d-36c7-4a4c-926b-e5f322471b8e"
  ]
}
```

Caso dê tudo certo, a resposta será assim:

`DELETE /products - FORMATO DA RESPOSTA - STATUS 204 - NO CONTENT`

# **Frontend**

## **Instruções**

Para rodar o app basta entrar na pasta frontend e digitar o comando `yarn start`, isso fará com que o servidor rode na porta 3000 do localhost por padrão.

## Páginas

`/login `

Página onde é possível realizar o login com o usuário pré cadastrado,

`/`

Página onde é possível ver a listagem dos produtos. Caso o usuário não esteja logado, os botões para deletar, editar, e criar novos produtos, e o checkbox dos cards para deletar em massa não aparecerão.

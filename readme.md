
# Remember Game

Aplicação para fixar conteúdos estudados em qualquer área.
O serviço cliente é um front end em vue2
O serviço do back-end é em NodeJS, Express e MongoDB


## Instalação

Baixe o projeto,
Instale as dependências,
Execute os scripts client/dev e api/server
Você precisará configurar um banco de dados MongoBD para que a aplicação rode completamente.
Atualmente este está setado para um banco localhost padrão do mongo.

## Documentação da API

#### Retorna todos os itens

```http
  GET /api/remember
```

#### Retorna um item

```http
  GET /api/remember/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Deleta um item

```http
  DELETE /api/remember/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |


#### Atualiza um item

```http
  PATCH /api/remember/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

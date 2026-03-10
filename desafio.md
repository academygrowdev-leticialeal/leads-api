
## Exercício Prático – Listagem Parametrizada de Leads

Você está trabalhando na evolução de uma **API de gerenciamento de leads** desenvolvida com **Node.js e Express**. Atualmente, a API já possui rotas para cadastro, busca por ID, atualização e remoção de leads.

Existe também uma rota responsável por listar todos os leads cadastrados:

```
GET /leads
```

No entanto, atualmente essa rota **retorna todos os leads cadastrados sem qualquer tipo de filtragem**.

Seu desafio será **evoluir essa funcionalidade**, permitindo que a listagem de leads seja **parametrizada**, ou seja, que o cliente da API possa aplicar **filtros na requisição** para buscar apenas os leads que atendem determinados critérios.

---

## Objetivo

Implementar uma **listagem parametrizada de leads**, permitindo que o usuário filtre os registros utilizando **query parameters** na requisição HTTP.

---

## Requisitos Funcionais

A rota:

```
GET /leads
```

deve passar a aceitar parâmetros opcionais de filtragem.

Caso parâmetros sejam informados, apenas os leads que correspondem aos critérios devem ser retornados.

Caso **nenhum filtro seja informado**, a API deve continuar retornando **todos os leads cadastrados**.

---

## Campos disponíveis para filtragem

Considere os atributos existentes no objeto `lead`:

* `id`
* `nomeCompleto`
* `email`
* `telefone`
* `endereco`

  * `cep`
  * `rua`
  * `bairro`
  * `cidade`
  * `uf`

O aluno deve permitir a filtragem por **qualquer um dos seguintes campos**:

### Dados principais

* `nomeCompleto`
* `email`
* `telefone`

### Dados de endereço

* `cep`
* `cidade`
* `uf`
* `bairro`

---

## Exemplos de uso da API

Listar **todos os leads**:

```
GET /leads
```

Listar leads por **cidade**:

```
GET /leads?cidade=Porto Alegre
```

Listar leads por **UF**:

```
GET /leads?uf=RS
```

Listar leads por **nome**:

```
GET /leads?nomeCompleto=Maria
```

Filtrar utilizando **mais de um critério**:

```
GET /leads?cidade=Porto Alegre&uf=RS
```

Nesse caso, devem ser retornados apenas leads que atendam **todos os critérios informados**.

---

## Regras de Implementação

1. Os filtros devem ser obtidos através de:

```
req.query
```

2. A lógica de filtragem deve ser aplicada **sobre o array `leads` existente em memória**.

3. A implementação deve:

* ignorar parâmetros não informados
* aplicar múltiplos filtros quando necessário
* retornar apenas os leads que correspondam aos critérios

4. A estrutura de resposta da API deve continuar seguindo o padrão existente:

```json
{
  "success": true,
  "message": "Leads listados com sucesso",
  "result": [...]
}
```

---

## Desafio Extra (Opcional)

Implemente também:

### 1️⃣ Busca parcial por nome

Permitir que o filtro de `nomeCompleto` funcione mesmo quando apenas parte do nome for informada.

Exemplo:

```
GET /leads?nomeCompleto=mar
```

Deve retornar:

* Maria Silva
* Marcos Pereira
* Mariane Costa

---

### 2️⃣ Ordenação da listagem

Adicionar suporte ao parâmetro:

```
sortBy
```

Exemplo:

```
GET /leads?sortBy=nomeCompleto
```

---

## Resultado Esperado

Ao final do exercício, a API deve permitir que clientes façam consultas como:

* buscar leads por cidade
* buscar leads por estado
* buscar leads por telefone
* combinar múltiplos filtros
* obter resultados mais específicos da base de leads


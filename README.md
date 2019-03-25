# Sparrow

🏴‍☠️ Sparrow é um bot que baixa séries no [eztv](https://eztv.ag) e legendas no [Legendei](https://legendei.com). 

**Importante**: É pra consumo próprio 😆

## Adicionando séries

Basta adicionar a série desejada no arquivo `shows.json` nesse formato:

```
{
    "name": [String: Nome da série],
    "eztv": [String: Slug no EZTV],
    "code": [Integer: ID no EZTV]
}
```

Para baixar, basta rodar no terminal: `node index`. Os arquivos estarão disponíveis no diretório `òutput`
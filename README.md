# Desafio - Take Blip

Desenvolvimento de Chatbot na plataforma Blip da Take. O Chatbot está [publicado](https://chat.blip.ai/?appKey=dGVzdGVhcnR1cnJpYmVpcm86YzcwMDE2YTktNDdjNy00MzIwLWIwNTYtNzNiYWFlZDU3ZTBm).

API para listar os 5 repositórios de C# mais antigos de um determinado usuário.
Desenvolvido para [Firebase Cloud Functions](https://firebase.google.com/products/functions?gclid=Cj0KCQjw78yFBhCZARIsAOxgSx3DNanRCGPcsw6d2_LVStnvZdG5AKDNcd9NimEGarqXvSPiO6dWnbAaAi2mEALw_wcB&gclsrc=aw.ds).

Ao realizar a requisição é preciso informar o nome do usuário no corpo da requisição, conforme exemplo abaixo:

``` json
{
    "user": "takenet"
}
```

> Existem arquivos do [Postman](https://www.postman.com) na pasta Api, para facilitar o teste.

## Observações sobre o desafio

- Apesar da especificação do desafio informar que o Chatbot teria o passo de Typing 4s apenas após o 💙 Take.Be, coloquei esse comportamento no fluxo de todos os valores, pois parecia ser o correto a ser feito.

- O nome das variáveis é exibido sempre em minúsculo no ambiente de Debug. Parece ser um bug.

- Como a utilização de arrays não é permitida ao referenciar variáveis (sintaxe {{variável}}), ficaria mais produtivo para os iniciantes na plataforma se o sistema identificasse quando é tentado algo nesse sentido e orientasse o usuário sobre a forma correta de utilizar arrays. **Ex:** Quando o usuário utilizar algo como {{response@items[0].description}}, o sistema poderia avisar na hora o erro de sintaxe e orientar.

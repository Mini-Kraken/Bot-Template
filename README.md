
# Discord Bot Template

Trata-se de um Template/Framework para facilitar a estruturar de bots em Discord.JS, tando um guia inicial para programadores que desejam criar bots rapidos e eficientes!

![App Screenshot](https://raw.githubusercontent.com/Mini-Kraken/Bot-Template/main/banner.png)

## Referência

Lembre-se de ler as seguintes documentações para te ajudar!

- [Discord.JS](https://discord.js.org)
- [API discord](https://discord.com/developers/docs/intro)
- [Mini Kraken](rpg.arkanus.app)

## FAQ

### Porque usar essa base e não outras?

Nosso template da suporte a fragmentação ideal para Bots grandes e verificados diferente de vários outros por ai.

#### Algum bot Importante usa essa base?

Sim, essa base é usada pelo Mini Kraken o maior bot de rpg de mesa brasileiro!

## Feedback & Suporte

Se você tiver algum feedback, por favor nos deixe saber por meio do nosso servidor do [Discord](https://discord.com/invite/Nm3CypkQaq)

## Inicializando o bot

Para rodar os testes, rode o seguinte comando

```bash
npm run start
```

## Funcionalidades

- [X]  Comandos Slash globais e locais
- [X]  Menus de interação
- [X]  Sistema de Botões
- [X]  Sistema de Dropdown
- [X]  Sistema de Modals
- [X]  Sistema de Auto Completar
- [X]  Estruturação com Suporte a Shards
- [X]  Sistema de Detecção de Erros & Depuração de Bugs
- [X]  Sistema anti Crash nativo
- [X]  Suporte a Traduções
- [X]  Sistema de Cache

## Arquivo de configuração
Crie um arquivo com o nome `config.json`, copie e cole o código abaixo:
```json
{ 
 "beta" : true,
 "token_beta": "TOKEN BOT DE TESTES",
 "token" :"TOKEN BOT PRINCIPAL",
 "client_id_beta": "ID BOT DE TESTES",
 "client_id": "ID BOT PRINCIPAL",
 "test_guild_id": "ID DO SERVIDOR DE TESTES"
}
```
- `beta`: É o switch ente um bot de testes e o bot principal. Para ligar no bot de testes, deixe `true`, para ligar o bot oficial, deixe `false`.
- `token_beta`: O token do bot de testes
- `token`: O token do bot principal
- `client_id_beta`: O client id do bot de testes
- `client_id`: O client id do bot principal
- `test_guild_id`: O ID do seu servidor de testes. É onde os comandos locais serão lançados antes de irem pro global

### Essa base foi inspirada e estruturada em cima da base [DiscordBot-Template](https://github.com/NamVr/DiscordBot-Template)

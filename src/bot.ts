import Bot from './telegram'

Bot.start((ctx) => ctx.reply('Hi!'))
Bot.hears('test', (ctx) => ctx.reply('It`s Work!!!!'))

Bot.launch()

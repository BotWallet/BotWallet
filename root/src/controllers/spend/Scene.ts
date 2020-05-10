import {TelegrafContext} from 'telegraf/typings/context'
import {Markup} from 'telegraf'

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const {leave} = Stage

export const spend = new Scene('spend')

spend.enter(async (ctx: TelegrafContext) => {
  await ctx.reply(
    'Укажите сумму',
    Markup.keyboard([
      Markup.button('100'),
      Markup.button('300'),
      Markup.button('500'),
    ]).extra(),
  )
})

spend.command('exit', leave())

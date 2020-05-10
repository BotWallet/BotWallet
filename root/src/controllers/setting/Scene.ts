import {TelegrafContext} from 'telegraf/typings/context'
import {Markup} from 'telegraf'

import {ReturnMainMenu} from '@app-controllers'

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const {leave} = Stage

export const setting = new Scene('setting')

setting.enter(async (ctx: TelegrafContext) => {
  await ctx.reply('Настройка профиля', Markup.keyboard([
    Markup.button('Установка баланса'),
    Markup.button('Главное меню'),
  ]).extra())
})

setting.hears('Установка баланса', async (ctx: any) => {
  await ctx.scene.enter('setTotalBalance')
})
setting.hears('Главное меню', async (ctx: TelegrafContext) => {
  await ReturnMainMenu(ctx)
})

setting.command('exit', leave())

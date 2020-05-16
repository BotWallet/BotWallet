import {TelegrafContext} from 'telegraf/typings/context'

import {SceneName} from '@app-common'
import {Keyboard, Triggers} from '../common'

const Scene = require('telegraf/scenes/base')

export const scene = new Scene(SceneName.Setting)

scene.enter(async (ctx: TelegrafContext) => {
  await ctx.reply('(Setting)\nНастройка профиля', Keyboard.setting)
})

scene.hears(Triggers.SetTotalBalance, async (ctx: any) => await ctx.scene.enter(SceneName.SetTotalBalance))
scene.hears(Triggers.MainMenu, async (ctx: any) => await ctx.scene.enter(SceneName.Main))

scene.on('message', async (ctx: TelegrafContext) => {
  await ctx.reply(`(Setting)\nНеизвестная команда.\nВоспользуйтесь /help или вспомогательной клавиатурой.`)
})

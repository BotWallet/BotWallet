import {TelegrafContext} from 'telegraf/typings/context'

import {SceneName} from '@app-common'

import {Keyboard, Triggers} from '../common'

const Scene = require('telegraf/scenes/base')

export const scene = new Scene(SceneName.Spend)

scene.enter(async (ctx: TelegrafContext) => {
  await ctx.reply(
    '(Spend)\nУкажите сумму',
    Keyboard.common
  )
})

scene.hears(Triggers.Cancel, async (ctx: any) => ctx.scene.enter(SceneName.Main))
scene.hears(Triggers.MainMenu, async (ctx: any) => ctx.scene.enter(SceneName.Main))

scene.on('message', async (ctx: any) => {
  const value = Number(ctx.message.text)

  if (value) {
    await ctx.scene.enter(SceneName.SelectSpendCategory, {request: value})
  }
  else {
    await ctx.reply('Некоректное значение.\nПожалуйста, повторите или воспользуйтесь всапомогательной клавиатурой для отмены')
  }
})




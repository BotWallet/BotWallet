import {TelegrafContext} from 'telegraf/typings/context'

import {SceneName} from '@app-common'
import {SceneRequest} from '@app-types'

import {Keyboard, Triggers} from '../common'

const Scene = require('telegraf/scenes/base')

export const scene = new Scene(SceneName.Main)

scene.enter(async (ctx: any) => {
  const state: SceneRequest = ctx.scene.state

  if (Triggers.Spend.test(state.request)) {
    await ctx.scene.enter(SceneName.Spend)
  }
  else if (Triggers.Setting.test(state.request)) {
    await ctx.scene.enter(SceneName.Setting)
  }
  else {
    await ctx.reply(`(Main)\nНеизвестная команда.\nВоспользуйтесь /help или вспомогательной клавиатурой.`, Keyboard.main)
  }
})

scene.hears(Triggers.Spend, async (ctx: any) => ctx.scene.enter(SceneName.Spend))
scene.hears(Triggers.Setting, async (ctx: any) => ctx.scene.enter(SceneName.Setting))

scene.on('message', async (ctx: TelegrafContext) => {
  await ctx.reply(`(Main)\nНеизвестная команда.\nВоспользуйтесь /help или вспомогательной клавиатурой.`)
})

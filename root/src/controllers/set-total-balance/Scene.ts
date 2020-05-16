import {TelegrafContext} from 'telegraf/typings/context'
import {AuthUser, SceneName} from '@app-common'
import {Keyboard, Triggers} from '../common'

const Scene = require('telegraf/scenes/base')

export const scene = new Scene(SceneName.SetTotalBalance)

scene.enter(async (ctx: TelegrafContext) => {
  const user = await AuthUser(ctx.from.id)
  if (user) {
    await ctx.reply(`(SetTotalBalance)\nТекущий общий баланс: ${user.totalBalance}\nУкажите новый:`, Keyboard.common)
  }
})

scene.hears(Triggers.MainMenu, async (ctx: any) => ctx.scene.enter(SceneName.Main))

scene.hears(Triggers.Cancel, async (ctx: any) => ctx.scene.enter(SceneName.Setting))

scene.on('message', async (ctx: any) => {
  const value = Number(ctx.message.text)
  if (value) {
    const user = await AuthUser(ctx.from.id)
    if (user) {
      await user.update({totalBalance: value})
      user.save()
      await ctx.reply(`Установлен новый общий баланс: ${value}`)
      await ctx.scene.enter(SceneName.Setting)
    }
  }
  else {
    await ctx.reply('Некоректное значение.\nПожалуйста, повторите или воспользуйтесь всапомогательной клавиатурой для отмены')
  }
})



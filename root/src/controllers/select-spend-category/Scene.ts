import {AuthUser, SceneName} from '@app-common'
import {SceneRequest} from '@app-types'

import {Keyboard, Triggers} from '../common'

const Scene = require('telegraf/scenes/base')

export const scene = new Scene(SceneName.SelectSpendCategory)

scene.enter(async (ctx: any) => {
  const state: SceneRequest = ctx.scene.state
  await ctx.reply(
    `(SelectSpendCategory, ${state.request})\nВыберите категорию`,
    Keyboard.selectCategory,
  )
})

scene.hears(Triggers.Back, async (ctx: any) => ctx.scene.enter(SceneName.Spend))
scene.hears(Triggers.MainMenu, async (ctx: any) => ctx.scene.enter(SceneName.Main))

scene.on('message', async (ctx: any) => {
  const state: SceneRequest = ctx.scene.state
  const value = Number(state.request)
  if (value) {
    const user = await AuthUser(ctx.from.id)
    if (user) {
      await user.updateOne({totalBalance: user.totalBalance - value})
      user.save()
      await ctx.reply(`Трата на сумму ${value} успешно записана!`)
    }
    const updateUser = await AuthUser(ctx.from.id)
    if (updateUser) {
      await ctx.reply(`Текущий общий остаток: ${updateUser.totalBalance}`)
    }
    await ctx.scene.enter(SceneName.Main)
  }
})

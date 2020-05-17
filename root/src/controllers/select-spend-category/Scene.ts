import {AuthUser, SceneName} from '@app-common'
import {SceneRequest} from '@app-types'

import {Triggers} from '../common'
import {Payment, User} from '@app-models'
import {Markup} from 'telegraf'

const Scene = require('telegraf/scenes/base')

export const scene = new Scene(SceneName.SelectSpendCategory)

scene.enter(async (ctx: any) => {
  const user = await User.findById(ctx.from.id)
  if (user) {
    const collect = user.category
    collect.push({
      name: 'Добавить категорию',
      children: [],
    })
    await ctx.reply(
      `Уточните категорию или добавте новую.\nКатегории могут быть вложеннными`,
      Markup.inlineKeyboard(
        user.category.map((item) => [
          Markup.callbackButton(item.name, '...'),
        ]),
      ).extra(),
    )
  }
})

scene.hears(Triggers.Back, async (ctx: any) => ctx.scene.enter(SceneName.Spend))
scene.hears(Triggers.MainMenu, async (ctx: any) => ctx.scene.enter(SceneName.Main))

scene.on('message', async (ctx: any) => {
  const state: SceneRequest = ctx.scene.state
  const value = Number(state.request)
  if (value) {
    const user = await AuthUser(ctx.from.id)
    if (user) {
      const now = new Date()
      const newPayment = new Payment({
        userId: user._id,
        amount: value,
        date: now,
        category: ctx.message.text,
      })
      await newPayment.save()
      await user.updateOne({totalBalance: user.totalBalance - value})
    }
    await ctx.scene.enter(SceneName.Main)
  }
})

// ToDo: action for payment category

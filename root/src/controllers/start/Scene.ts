import {User} from '@app-models'

import {AuthUser, DefaultCategory, SceneName} from '@app-common'

const Scene = require('telegraf/scenes/base')

export const scene = new Scene(SceneName.Start)

scene.enter(async (ctx: any) => {

  const user = await AuthUser(ctx.from.id)

  if (user) {
    await ctx.reply(`Пользователь @${user.username} уже зарегистрирован`)
  }
  else {
    const now = new Date()
    const newUser = new User({
      _id: ctx.from.id,
      created: now,
      username: ctx.from.username,
      name: ctx.from.first_name + ' ' + ctx.from.last_name,
      lastActivity: now,
      totalBalance: 0,
      category: DefaultCategory,
    })
    await newUser.save()
    await ctx.reply(`Пользователь @${newUser.username} успешно зарегистрирован!`)
  }
  await ctx.scene.enter(SceneName.Main)
})


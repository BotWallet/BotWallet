import {User} from '@app-models'
import {TelegrafContext} from 'telegraf/typings/context'
import {AuthUser} from '@app-common'
import {Markup} from 'telegraf'

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

const {leave} = Stage

export const start = new Scene('start')

start.enter(async (ctx: TelegrafContext) => {

  const user = await AuthUser(ctx.from.id)

  if (user) {
    await ctx.reply(
      `Пользователь @${user.username} уже зарегистрирован.\nДля поиска нужной команды, используйте /help или клавиатурой`,
      Markup.keyboard([
        Markup.button('Потратил'),
        Markup.button('Получил'),
        Markup.button('Настройки'),
      ]).extra(),
    )
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
    })
    await newUser.save()
    await ctx.reply(
      `Пользователь @${newUser.username} успешно зарегистрирован! Настроить пользовательские настройки?`,
      Markup.keyboard([
        Markup.button('Да'),
        Markup.button('Позже'),
      ]).extra(),
    )
  }
})

start.command('exit', leave())

start.hears('Настройки', async (ctx: any) => ctx.scene.enter('setting'))

import {TelegrafContext} from 'telegraf/typings/context'
import {Markup} from 'telegraf'

import {AuthUser} from '@app-common'

export const setTotalBalanceSettingAction = async (ctx: TelegrafContext) => {
  const user = await AuthUser(ctx.from.id)

  if (user) {
    await ctx.reply(`Текущий общий баланс: ${user.totalBalance}\nДля изменения введите новый`, Markup.inlineKeyboard([
      Markup.callbackButton('Отмена', 'cancelChangeTotalBalance'),
    ]).extra())
  }
}

export const CancelChangeTotalBalanceAction = async (ctx: TelegrafContext) => {
  await ctx.deleteMessage()
}

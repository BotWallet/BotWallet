import {TelegrafContext} from 'telegraf/typings/context'
import {setting} from '../setting'
import {CancelChangeTotalBalanceAction, setTotalBalanceSettingAction} from './Actions'
import {AuthUser} from '@app-common'

const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

export const setTotalBalance = new Scene('setTotalBalance')

setTotalBalance.enter(async (ctx: TelegrafContext) => {
  await setTotalBalanceSettingAction(ctx)
})

setTotalBalance.use(async (ctx: TelegrafContext) => {
  const value = Number(ctx.message.text)
  if (value) {
    const user = await AuthUser(ctx.from.id)
    if (user) {
      const id = user._id
      await user.update({totalBalance: value})
      user.save()
      await ctx.reply(`Установлен новый общий баланс: ${value}`)
    }
  }
  else {
    await ctx.reply('Некоректное значение.\nПожалуйста, повторите')
  }
})

setting.action('cancelChangeTotalBalance', async (ctx: TelegrafContext) => {
  await CancelChangeTotalBalanceAction(ctx)
})

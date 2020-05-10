import {TelegrafContext} from 'telegraf/typings/context'

export const ReturnMainMenu = async (ctx: TelegrafContext) => {
  const Stage = require('telegraf/stage')
  const {leave} = Stage
  leave()
}

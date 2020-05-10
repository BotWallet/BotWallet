
import mongoose from 'mongoose'
import {Stage} from 'telegraf'

import {Config} from '@app-config'

import {SettingScene, SetTotalBalanceScene, SpendScene, StartScene} from '@app-controllers'
import Bot from './Telegram'

mongoose.connect(Config.mongoConnect, {
  useNewUrlParser: true,
  useFindAndModify: false,
})

mongoose.connection.on('error', err => {
  throw new Error(err)
})

mongoose.connection.on('open', () => {

  const stage = new Stage([
    StartScene.start,
    SettingScene.setting,
    SpendScene.spend,
    SetTotalBalanceScene.setTotalBalance,
  ])

  Bot.use(stage.middleware())

  Bot.start(async (ctx: any) => ctx.scene.enter('start'))

  Bot.command('setting', async (ctx: any) => ctx.scene.enter('setting'))

  Bot.command('spend', async (ctx: any) => ctx.scene.enter('spend'))
})




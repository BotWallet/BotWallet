import mongoose from 'mongoose'
import {Stage} from 'telegraf'

import {Config} from '@app-config'
import {scenes} from '@app-controllers'
import {SceneName} from '@app-common'

import Bot from './Telegram'

mongoose.connect(Config.mongoConnect, {
  useNewUrlParser: true,
  useFindAndModify: false,
})

mongoose.connection.on('error', err => {
  throw new Error(err)
})

mongoose.connection.on('open', () => {

  const stage = new Stage(scenes)

  Bot.use(stage.middleware())

  Bot.start(async (ctx: any) => ctx.scene.enter(SceneName.Start))

  Bot.on('text', async (ctx: any) => ctx.scene.enter(SceneName.Main, {request: ctx.message.text}))

})




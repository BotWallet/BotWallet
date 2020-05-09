import Telegraf, {session} from 'telegraf'
import {TelegrafContext} from 'telegraf/typings/context'

import {Config} from '@app-config'

const SocksAgent = require('socks5-https-client/lib/Agent')

const socksAgent = new SocksAgent({
  socksHost: Config.socksHost,
  socksPort: Config.socksPort,
  socksUsername: Config.socksUsername,
  socksPassword: Config.socksPassword,
})

const Bot = new Telegraf(Config.TOKEN, {
  telegram: {agent: socksAgent},
})

Bot.catch((err: Error, ctx: TelegrafContext) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

Bot.use(session())
Bot.launch().then().catch((error) => {throw new Error(error)})

export default Bot


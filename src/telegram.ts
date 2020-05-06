import Telegraf from 'telegraf'

const SocksAgent = require('socks5-https-client/lib/Agent')

const socksAgent = new SocksAgent({
  socksHost: '81.17.20.50',
  socksPort: '13726',
})

const Bot = new Telegraf(process.env.TOKEN, {
  telegram: {agent: socksAgent},
})

export default Bot

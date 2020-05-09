import {Markup} from 'telegraf'
import {TelegrafContext} from 'telegraf/typings/context'

import {commonTypes} from '@app-types'

import Bot from './telegram'
import {Synonymizer, Request} from './common'

const buttons = {
  setting: {
    id: '0',
    name: 'Настройка бота',
  },
  help: {
    id: '1',
    name: 'Помощь',
  },
  consumption: {
    id: '3',
    name: 'Потратил(-а)',
  },
  income: {
    id: '4',
    name: 'Получил(-а)',
  },
  cancelLastAction: {
    id: '2',
    name: 'Отменить это действие',
  },
  advice: {
    all: {
      id: '-1',
      name: 'Еще совет',
    },
  },
}

Bot.start((ctx) => {
  ctx.reply('Hi!\n', Markup.inlineKeyboard([
    Markup.callbackButton(buttons.setting.name, buttons.setting.id),
    Markup.callbackButton(buttons.help.name, buttons.help.id),
  ]).extra())
})

Bot.help((ctx) => {
  Help(ctx)
})

Bot.command('advice', (ctx) => {
  Advice(ctx)
})

Bot.command('setting', (ctx) => {
  Setting(ctx)
})

Bot.on('text', (ctx) => {
  const validate: commonTypes.Request = Synonymizer(ctx.message.text)
  if (validate === commonTypes.Request.BAD_REQUEST) {
    ctx.reply('Пожалуйста, уточните свое что нужно сделать?', Markup.inlineKeyboard([
      Markup.callbackButton(buttons.consumption.name, buttons.consumption.id),
      Markup.callbackButton(buttons.income.name, buttons.income.id),
    ]).extra())
  }
  else {
    ctx.reply('Действие выполнено успешно', Markup.inlineKeyboard([
         Markup.callbackButton(buttons.cancelLastAction.name, buttons.cancelLastAction.id),
       ]).extra())
       .catch(() => {
         throw new Error()
       })
  }
})

Bot.action(buttons.setting.id, (ctx) => {
  Setting(ctx)
})

Bot.action(buttons.consumption.id, (ctx) => {
  Mock(ctx)
})

Bot.action(buttons.income.id, (ctx) => {
  Mock(ctx)
})

Bot.action(buttons.help.id, (ctx) => {
  Help(ctx)
})

Bot.action(buttons.advice.all.id, (ctx) => {
  Advice(ctx)
})

const Help = (ctx: TelegrafContext) => {
  ctx.reply('/advice - Получить случайный совет (Thanks www.fucking-great-advice.ru)\n' +
    '/setting - Настройка профиля',
  )
}

const Advice = (ctx: TelegrafContext, params: string = '') => {
  Request<commonTypes.Advice>(`http://fucking-great-advice.ru/api/${params ? `random_by_tag/${params}` : 'random'}`).then((res) => {
    ctx.reply(res.text, Markup.inlineKeyboard([
      Markup.callbackButton(buttons.advice.all.name, buttons.advice.all.id),
    ]).extra())
  })
}

const Mock = (ctx: TelegrafContext) => {
  ctx.reply('Люда, это не работает!')
}

const Setting = (ctx: TelegrafContext) => {
  ctx.reply('Настройка')
}



import {Markup} from 'telegraf'

export const main = Markup.keyboard([
  Markup.button('Потратил'),
  Markup.button('Настройки'),
]).extra()

export const setting = Markup.keyboard([
  Markup.button('Установить общий баланс'),
  Markup.button('Главное меню'),
]).extra()

export const selectCategory = Markup.keyboard([
  Markup.button('Любая'),
  Markup.button('Назад'),
  Markup.button('Главное меню'),
]).extra()

export const common = Markup.keyboard([
  Markup.button('Отмена'),
  Markup.button('Главное меню'),
]).extra()

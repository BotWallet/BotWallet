import {ICategory} from '@app-models'

export const DefaultCategory: ICategory[] = [
  {
    name: 'Питание',
    children: [
      {
        name: 'Кафе',
        children: null,
      },
      {
        name: 'Продукты',
        children: null,
      },
    ],
  },
  {
    name: 'Услуги',
    children: [
      {
        name: 'Мобильный телефон',
        children: null,
      },
    ],
  },
]

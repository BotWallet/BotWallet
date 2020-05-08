import {commonTypes} from '../../types'

export const Synonymizer = (query: string) => {

  const target: string = query.toLowerCase()

  switch (target) {
    case 'потратил':
      return commonTypes.Request.CONSUMPTION
    case 'заработал':
      return commonTypes.Request.INCOME
    default:
      return commonTypes.Request.BAD_REQUEST
  }

}

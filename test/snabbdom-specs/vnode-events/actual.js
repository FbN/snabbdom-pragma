
import { clickHandler } from './neutral.js'

export default (createElement) => {
  return createElement('div', { 'on-click': clickHandler })
}

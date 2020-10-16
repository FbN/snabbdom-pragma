
import { clickHandler } from './neutral.js'

export default (h) => {
  return h('div', { on: { click: clickHandler } }, [])
}

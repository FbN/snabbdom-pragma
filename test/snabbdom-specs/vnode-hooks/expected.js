
import { onInit } from './neutral.js'

export default (h) => {
  return h('div', { hook: { init: onInit } }, [])
}

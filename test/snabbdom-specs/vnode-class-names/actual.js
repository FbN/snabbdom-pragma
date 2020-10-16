
import { isVisible, isEnabled } from './neutral.js'

export default (createElement) => {
  return createElement('div', { 'class-visible': isVisible, 'class-enabled': isEnabled, 'class-alert-danger': true })
}

import { onInit } from './neutral.js'

export default createElement => {
    return createElement('div', { 'hook-init': onInit })
}

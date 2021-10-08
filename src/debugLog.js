import { legacy } from './serverlessLog.js'

export default typeof process.env.SLS_DEBUG !== 'undefined'
  ? (...args) => legacy.consoleLog('[offline]', ...args)
  : () => null

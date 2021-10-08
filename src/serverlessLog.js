import boxen from 'boxen'
import chalk from 'chalk'
import { getPluginWriters, legacy, style } from '@serverless/utils/log'

const { log, progress, writeText } = getPluginWriters('serverless-offline')
export { log, progress, style, legacy }

const { max } = Math

const blue = chalk.keyword('dodgerblue')
const grey = chalk.keyword('grey')
const lime = chalk.keyword('lime')
const orange = chalk.keyword('orange')
const peachpuff = chalk.keyword('peachpuff')
const plum = chalk.keyword('plum')
const red = chalk.keyword('red')
const yellow = chalk.keyword('yellow')

const colorMethodMapping = new Map([
  ['DELETE', red],
  ['GET', blue],
  // ['HEAD', ...],
  ['PATCH', orange],
  ['POST', plum],
  ['PUT', blue],
])

export default function serverlessLog(msg) {
  legacy.log(msg, 'offline')
}

export function logLayers(msg) {
  legacy.consoleLog(`offline: ${blue(msg)}`)
}

// logs based on:
// https://github.com/serverless/serverless/blob/master/lib/classes/CLI.js

function logRoute(method, server, path, maxLength, dimPath = false) {
  const methodColor = colorMethodMapping.get(method) ?? peachpuff
  const methodFormatted = method.padEnd(maxLength, ' ')

  return `${methodColor(methodFormatted)} ${yellow.dim('|')} ${grey.dim(
    server,
  )}${dimPath ? grey.dim(path) : lime(path)}`
}

function getMaxHttpMethodNameLength(routeInfo) {
  return max(...routeInfo.map(({ method }) => method.length))
}

export function logRoutes(routeInfo) {
  const boxenOptions = {
    borderColor: 'yellow',
    dimBorder: true,
    margin: 1,
    padding: 1,
  }
  const maxLength = getMaxHttpMethodNameLength(routeInfo)

  legacy.consoleLog(
    boxen(
      routeInfo
        .map(
          ({ method, path, server, invokePath }) =>
            // eslint-disable-next-line prefer-template
            logRoute(method, server, path, maxLength) +
            '\n' +
            logRoute('POST', server, invokePath, maxLength, true),
        )
        .join('\n'),
      boxenOptions,
    ),
  )

  writeText(
    boxen(
      routeInfo
        .map(
          ({ method, path, server, invokePath }) =>
            // eslint-disable-next-line prefer-template
            logRoute(method, server, path, maxLength) +
            '\n' +
            logRoute('POST', server, invokePath, maxLength, true),
        )
        .join('\n'),
      boxenOptions,
    ),
  )
}

export function logWarning(msg) {
  legacy.consoleLog(`offline: ${red(msg)}`)
}

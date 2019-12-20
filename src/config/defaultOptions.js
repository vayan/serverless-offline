import { createApiKey } from '../utils/index.js'

export default {
  apiKey: createApiKey(),
  disableCookieValidation: false,
  enforceSecureCookies: false,
  hideStackTraces: false,
  host: 'localhost',
  httpsProtocol: '',
  lambdaPort: 3002,
  noAuth: false,
  noTimeout: false,
  port: 3000,
  printOutput: false,
  resourceRoutes: false,
  useChildProcesses: false,
  useWorkerThreads: false,
  websocketPort: 3001,
  useDocker: false,
}

import { log, legacy } from '../../../serverlessLog.js'

export default class InvokeAsyncController {
  #lambda = null

  constructor(lambda) {
    this.#lambda = lambda
  }

  async invokeAsync(functionName, event) {
    const lambdaFunction = this.#lambda.getByFunctionName(functionName)

    lambdaFunction.setEvent(event)

    // don't await result!
    lambdaFunction.runHandler().catch((err) => {
      // TODO handle error
      legacy.consoleLog(err)
      log.error(err)
      throw err
    })

    return {
      StatusCode: 202,
    }
  }
}

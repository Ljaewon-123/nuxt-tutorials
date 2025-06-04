import { HttpStatusCode, HttpStatusMessage } from "../enum/http"

export const httpError = (statusCode: HttpStatusCode, statusMessage: HttpStatusMessage, message: string) =>
  createError({ statusCode, statusMessage, message })

export const forbiddenError = (message = 'Forbidden') =>
  httpError(HttpStatusCode.FORBIDDEN, HttpStatusMessage.FORBIDDEN, message)

export const unauthorizedError = (message = 'Unauthorized') =>
  httpError(HttpStatusCode.UNAUTHORIZED, HttpStatusMessage.UNAUTHORIZED, message)

export const notFoundError = (message = 'Not Found') =>
  httpError(HttpStatusCode.NOT_FOUND, HttpStatusMessage.NOT_FOUND, message)

export const badRequestError = (message = 'Bad Request') =>
  httpError(HttpStatusCode.BAD_REQUEST, HttpStatusMessage.BAD_REQUEST, message)

export const serverError = (message = 'Server Error') =>
  httpError(HttpStatusCode.INTERNAL_SERVER_ERROR, HttpStatusMessage.INTERNAL_SERVER_ERROR, message)

export const noContentError = (message = "No Content") =>
  httpError(HttpStatusCode.NO_CONTENT, HttpStatusMessage.NO_CONTENT, message)
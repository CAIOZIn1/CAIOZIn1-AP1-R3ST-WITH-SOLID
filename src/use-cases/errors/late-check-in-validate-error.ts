export class LateCheckInValidateError extends Error {
  constructor() {
    super(`The check-in can only validated unitl 20 minutes!`)
  }
}

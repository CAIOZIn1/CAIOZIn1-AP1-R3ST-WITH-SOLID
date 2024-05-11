import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
})

app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    console.log('LOGS para Datadog/sentry/newRelic')
  }

  return res.status(500).send({ message: 'Internal server error' })
})

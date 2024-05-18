import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { hashing } from './hashing'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password_hash: await hashing('123456'),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}

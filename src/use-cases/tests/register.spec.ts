import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { hashing } from '@/utils/hashing'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('Register Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hashing('123456'),
    })

    const { user } = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hashing('123456'),
    })

    expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: '124356',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

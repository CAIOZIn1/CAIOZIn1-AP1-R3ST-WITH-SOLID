import { ValidateCheckInUseCase } from '../validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCreateGymsUseCase() {
  const gymsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(gymsRepository)

  return useCase
}

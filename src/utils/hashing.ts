import { hash } from 'bcryptjs'

export async function hashing(key: string): Promise<string> {
  return await hash(key, 6)
}

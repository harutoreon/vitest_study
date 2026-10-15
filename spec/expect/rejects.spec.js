import { describe, it, expect } from 'vitest'

async function fetchUser(id) {
  if (id < 0) throw new Error('Invalid ID')
  return { id, name: 'Alice'}
}

describe('rejects', () => {
  it('不正な ID で reject される', async () => {
    await expect(fetchUser(-1)).rejects.toThrow('Invalid ID')
  })

  it('正当な ID で resolve される', async () => {
    await expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'Alice' })
  })
})

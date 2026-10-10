import { describe, it, expect, vi } from 'vitest'

describe('mockResolvedValue', () => {
  it('resolve される値を返す', async () => {
    const fetchUser = vi.fn()
    fetchUser.mockResolvedValue({ id: 1, name: 'Alice' })

    const user = await fetchUser(1)

    expect(user).toEqual({ id: 1, name: 'Alice' })
    expect(fetchUser).toHaveBeenCalledWith(1)
  })
})

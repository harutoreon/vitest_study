import { describe, it, expect, vi } from 'vitest'

describe('mockRejectedValue', () => {
  it('指定されたエラーで拒否する', async () => {
    const fetchUser = vi.fn()
    fetchUser.mockRejectedValue(new Error('Network Error'))

    await expect(fetchUser(1)).rejects.toThrow('Network Error')
  })
})

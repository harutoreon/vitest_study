import { describe, it, expect, vi } from 'vitest'

describe('mockRejectedValueOnce', () => {
  it('API 失敗時にエラーを投げる', async () => {
    const api = vi.fn().mockRejectedValueOnce(new Error('Network Error'))

    await expect(api()).rejects.toThrow('Network Error')
  })
})

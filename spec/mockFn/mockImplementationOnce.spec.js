import { describe, it, expect, vi } from 'vitest'

async function fetchWithRetry(fetcher, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetcher()
    } catch (error) {
      if (i === retries - 1) throw error
    }
  }
  throw new Error('unreachable')
}

describe('mockImplementationOnce', () => {
  it('呼び出しごとに異なる値を返す', () => {
    const fn = vi.fn(() => 'default')

    fn.mockImplementationOnce(() => 'first')
    fn.mockImplementationOnce(() => 'second')

    expect(fn()).toBe('first')
    expect(fn()).toBe('second')
    expect(fn()).toBe('default')
  })

  it('2 回失敗しても 3 回目で成功すれば結果を返す', async () => {
    const fetcher = vi.fn()
      .mockRejectedValueOnce(new Error('fail 1'))
      .mockRejectedValueOnce(new Error('fail 2'))
      .mockResolvedValueOnce('ok')

    await expect(fetchWithRetry(fetcher)).resolves.toBe('ok')
    expect(fetcher).toHaveBeenCalledTimes(3)
  })
})

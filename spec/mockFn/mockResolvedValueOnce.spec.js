import { describe, it, expect, vi } from 'vitest'

describe('mockResolvedValueOnce', () => {
  it('呼び出しごとに異なる値を返す', async () => {
    const fetchUser = vi.fn()
      .mockResolvedValueOnce({ id: 1, name: 'Alice'})
      .mockResolvedValueOnce({ id: 2, name: 'Bob'})

    expect(await fetchUser()).toEqual({ id: 1, name: 'Alice'})
    expect(await fetchUser()).toEqual({ id: 2, name: 'Bob'})
    expect(await fetchUser()).toBeUndefined()
  })
})

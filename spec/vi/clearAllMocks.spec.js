import { describe, it, expect, vi, beforeEach } from 'vitest'

const fetchUser = vi.fn().mockReturnValue({ id: 1, name: 'Alice' })

describe('clearAllMocks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('1 回目の呼び出し', () => {
    fetchUser()
    expect(fetchUser).toHaveBeenCalledTimes(1)
  })

  it('2 回目のテストでも呼び出し回数は 0 から始まる', () => {
    expect(fetchUser).toHaveBeenCalledTimes(0)

    fetchUser()
    expect(fetchUser).toHaveBeenCalledTimes(1)
  })

  it('3 回目のテストで戻り値を変更する', () => {
    fetchUser.mockReturnValue({ id: 2, name: 'Bob' })

    fetchUser()
    expect(fetchUser.mock.results).toEqual([
      { type: 'return', value: { id: 2, name: 'Bob' } }
    ])
  })

  it('4 回目のテストで戻り値はリセットされない', () => {
    fetchUser()
    expect(fetchUser.mock.results).toEqual([
      { type: 'return', value: { id: 2, name: 'Bob' } }
    ])
  })
})

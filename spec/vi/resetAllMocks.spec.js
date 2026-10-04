import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('getUserName', () => {
  const fetchUser = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('1 回目の呼び出し', () => {
    fetchUser.mockReturnValue({ id: 1, name: 'Alice' })
    fetchUser()

    expect(fetchUser.mock.results[0]).toEqual(
      {
        "type": "return",
        "value": {
          "id": 1,
          "name": "Alice",
        },
      }
    )
    expect(fetchUser).toHaveBeenCalledTimes(1)
  })

  it('2 回目の呼び出し', () => {
    // vi.resetAllMocks() が実行されたことで、呼び出し履歴と実装がリセットされる
    expect(fetchUser.mock.calls).toEqual([])
    expect(fetchUser.mock.results).toEqual([])
  })
})

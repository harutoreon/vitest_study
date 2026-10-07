import { describe, it, expect, vi } from 'vitest'

describe('settledResults', () => {
  it('resolve された値を検証する', async () => {
    const fetchUser = vi.fn().mockResolvedValue({ id: 1, name: 'Taro' })

    await fetchUser()

    expect(fetchUser.mock.settledResults).toEqual([
      { type: 'fulfilled', value: { id: 1, name: 'Taro' } }
    ])
  })

  it('reject されたエラーを検証する', async () => {
    const fetchUser = vi.fn().mockRejectedValue(new Error('Not Found'))

    await fetchUser().catch(() => {}) // 未処理 rejection を避けるため捕捉

    const result = fetchUser.mock.settledResults
    expect(result[0].type).toBe('rejected')
    expect(result[0].value).toBeInstanceOf(Error)
  })

  it('引数と結果を対応づけて検証する', async () => {
    const double = vi.fn(async (n) => n * 2)

    await double(1)
    await double(2)

    expect(double.mock.calls[1]).toEqual([2])
    expect(double.mock.settledResults[1]).toEqual({
      type: 'fulfilled',
      value: 4
    })
  })

  it('決着前は空配列になる', async () => {
    const slow = vi.fn(
      () => new Promise((resolve) => setTimeout(() => resolve('done'), 100)),
    )

    const promise = slow()
    expect(slow.mock.settledResults).toEqual([])

    await promise

    expect(slow.mock.settledResults).toEqual([
      { type: 'fulfilled', value: 'done' }
    ])
  })

  it('incomplete のケース', async () => {
    const fn = vi.fn().mockResolvedValueOnce('result')

    const result = fn()

    fn.mock.settledResults === [
      {
        type: 'incomplete',
        value: undefined,
      },
    ]

    await result

    fn.mock.settledResults === [
      {
        type: 'fulfilled',
        value: 'result',
      },
    ]
  })
})

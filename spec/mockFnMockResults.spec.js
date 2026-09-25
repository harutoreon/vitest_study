import { describe, it, expect, vi } from 'vitest'

describe('mockFnMockResults', () => {
  it('mock.results の基本', () => {
    const mockFn = vi.fn((x) => x * 2)

    mockFn(1)
    mockFn(2)

    expect(mockFn.mock.results).toEqual([
      { type: 'return', value: 2 },
      { type: 'return', value: 4 },
    ])
  })

  it('例外時の記録', () => {
    const mockFn = vi.fn(() => {
      throw new Error('failed')
    })

    try { mockFn() } catch {}

    console.log(mockFn.mock.results)  // [ { type: 'throw }, value: { Error: failed, at: ... } ]
    expect(mockFn.mock.results[0].type).toBe('throw')
    expect(mockFn.mock.results[0].value.message).toBe('failed')
  })

  it('最後の呼び出し結果だけ確認したい場合', () => {
    const mockFn = vi.fn((x) => x * 2)

    mockFn(1)
    mockFn(2)

    const lastResult = mockFn.mock.results.at(-1)
    console.log(lastResult)  // [ { type: 'return', value: 2 }, { type: 'return', value: 4 } ]

    expect(lastResult?.value).toBe(4)
  })

  it('非同期関数の場合', async () => {
    const asyncMock = vi.fn(async () => 'done')
    await asyncMock()

    // resolve 後の値を検証するとき
    console.log(asyncMock.mock.results)  // [ { type: 'return', value: Promise { 'done' } } ]

    // resolve/reject 後の状態まで記録して、resolve 後の値を検証する場合
    console.log(asyncMock.mock.settledResults)  // [ { type: 'fulfilled', value: 'done' } ]

    expect(asyncMock.mock.settledResults).toEqual([
      { type: 'fulfilled', value: 'done' },
    ])
  })
})

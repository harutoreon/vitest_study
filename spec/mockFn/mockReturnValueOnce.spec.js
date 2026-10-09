import { describe, it, expect, vi } from 'vitest'

describe('mockReturnValueOnce', () => {
  it('呼び出しごとに異なる値を返す', () => {
    const fn = vi.fn()
    fn.mockReturnValueOnce('1回目')
    fn.mockReturnValueOnce('2回目')

    expect(fn()).toBe('1回目')
    expect(fn()).toBe('2回目')
    expect(fn()).toBeUndefined()
  })

  it('戻り値はモック自身なのでチェーンして記述できる', () => {
    const fn = vi.fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValue(99)

    fn()
    fn()
    fn()
    fn()

    console.log(fn.mock.results)
    // [
    //   { type: 'return', value: 1 },
    //   { type: 'return', value: 2 },
    //   { type: 'return', value: 99 },
    //   { type: 'return', value: 99 }
    // ]
  })

  it('デフォルト値を指定する', () => {
    const fn = vi.fn().mockReturnValue('default')
    fn.mockReturnValueOnce('special')

    expect(fn()).toBe('special')
    expect(fn()).toBe('default')
    expect(fn()).toBe('default')
  })
})

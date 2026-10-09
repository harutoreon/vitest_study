import { describe, it, expect, vi } from 'vitest'

describe('mockReturnValue', () => {
  it('固定値を返す', () => {
    const fn = vi.fn()
    fn.mockReturnValue(42)

    fn()

    console.log(fn.mock.results)  // [ { type: 'return', value: 42 } ]
    expect(fn.mock.results[0].value).toBe(42)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('作書の数回だけ特別な値、それ以降は既定値', () => {
    const fn = vi.fn()

    fn.mockReturnValue('default')
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second')

    fn()
    fn()
    fn()

    expect(fn.mock.calls).toHaveLength(3)
    expect(fn.mock.results[0].value).toBe('first')
    expect(fn.mock.results[1].value).toBe('second')
    expect(fn.mock.results[2].value).toBe('default')
  })
})

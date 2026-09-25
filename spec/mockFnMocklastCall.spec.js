import { describe, it, expect, vi } from 'vitest'

describe('mockFnMockCall', () => {
  it('最後の呼び出しを検証する', () => {
    const mockFn = vi.fn()

    mockFn(1, 2, 3)
    mockFn('a', 'b')

    console.log(mockFn.mock.lastCall)  // [ 'a', 'b' ]
    console.log(mockFn.mock.calls[mockFn.mock.calls.length -1])  // [ 'a', 'b' ]
  })

  it('最後に送信された名前を検証する', () => {
    const onSubmit = vi.fn()

    onSubmit({ name: 'Alice' })
    onSubmit({ name: 'Bob' })

    console.log(onSubmit.mock.lastCall)  // [ { name: 'Bob' } ]
    expect(onSubmit.mock.lastCall).toEqual([{ name: 'Bob' }])
    expect(onSubmit).toHaveBeenLastCalledWith({ name: 'Bob' })
  })
})

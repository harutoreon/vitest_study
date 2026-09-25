import { describe, it, expect, vi } from 'vitest'

describe('mockFnMockCalls', () => {
  it('呼び出し内容を確認する', () =>{
    const mockFn = vi.fn()

    mockFn(1, 2)
    mockFn('a', 'b')

    console.log(mockFn.mock.calls)  // [ [ 1, 2 ], [ 'a', 'b' ] ]
    expect(mockFn.mock.calls.length).toBe(2)
  })

  it('特定の呼び出しの引数を確認する', () =>{
    const mockFn = vi.fn()

    mockFn(1, 2)
    mockFn('a', 'b')

    console.log(mockFn.mock.calls)  // [ [ 1, 2 ], [ 'a', 'b' ] ]
    expect(mockFn.mock.calls[0][0]).toBe(1)
    expect(mockFn.mock.calls[1]).toEqual([ 'a', 'b' ])
  })

  it('関連プロパティ', () => {
    const mockFn = vi.fn()

    mockFn.mockReturnValueOnce(10)
    mockFn()

    console.log(mockFn.mock.results)
    console.log(mockFn.mock.instances)
    console.log(mockFn.mock.contexts)
  })
})

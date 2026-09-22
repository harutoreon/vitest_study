import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('viSpyOn', () => {
  it('元の実装を保ったまま呼び出しを監視する', () => {
    const mathUtils = {
      add: (a, b) => a + b
    }
    const spy = vi.spyOn(mathUtils, 'add')

    mathUtils.add(1, 2)
    console.log(spy.mock.calls)  // [ [ 1, 2 ] ]

    expect(spy).toHaveBeenLastCalledWith(1, 2)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('実装を差し替える', () => {
    const mathUtils = {
      add(a, b) {
        return a + b
      }
    }
    const spy = vi.spyOn(mathUtils, 'add').mockImplementation(() => 100)

    mathUtils.add(1, 2)

    console.log(spy.mock.calls)    // [ [ 1, 2 ] ]
    console.log(spy.mock.results)  // [ { type: 'return', value: 100 } ]

    expect(spy.mock.results[0].value).toBe(100)
    expect(spy).toHaveBeenLastCalledWith(1, 2)
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })

  it('戻り値だけ固定する', () => {
    const mathUtils = {
      add(a, b) {
        return a + b
      }
    }
    const spy = vi.spyOn(mathUtils, 'add').mockReturnValue(100)

    mathUtils.add(1, 2)

    console.log(spy.mock.calls)    // [ [ 1, 2 ] ]
    console.log(spy.mock.results)  // [ { type: 'return', value: 100 } ]

    expect(spy.mock.results[0].value).toBe(100)
    expect(spy).toHaveBeenLastCalledWith(1, 2)
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
})

import { describe, it, expect, vi } from 'vitest'

describe('expectToHaveBeenCalled', () => {
  it('モック関数が呼ばれたことを確認する', () => {
    const mockCallback = vi.fn()

    mockCallback()

    console.log(mockCallback.mock.calls)  // [ [] ]
    expect(mockCallback).toHaveBeenCalled()
  })

  it('関連マッチャー', () => {
    const mockFn = vi.fn()

    mockFn('hello', 123)

    console.log(mockFn.mock.calls)  // [ [ 'hello', 123 ] ]
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('hello', 123)
    expect(mockFn).toHaveBeenLastCalledWith('hello', 123)
  })

  it('関数呼び出しのスパイ', () => {
    const obj = {
      save() {
        // 何かの保存処理
      }
    }

    const spy = vi.spyOn(obj, 'save')

    obj.save()

    console.log(spy.mock.calls)  // [ [] ]
    expect(spy).toHaveBeenCalled()
  })
})

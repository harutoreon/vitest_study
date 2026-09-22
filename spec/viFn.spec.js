import { describe, it, expect, vi } from 'vitest'
import {a} from "vitest/dist/chunks/suite.qtkXWc6R.d.ts";

describe('viFn', () => {
  it('呼び出しを記録する', () => {
    const fn = vi.fn()

    fn('a', 1)
    fn('b', 2)

    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenCalledWith('a', 1)
    expect(fn).toHaveBeenLastCalledWith('b', 2)
  })

  it('戻り値を指定する', () => {
    const fn = vi.fn()

    fn.mockReturnValue(42)
    console.log(fn())  // 42

    fn.mockReturnValueOnce(1)
    console.log(fn())  // 1

    fn.mockResolvedValue({ id: 1})
    console.log(fn())  // Promise { { id: 1 } }

    fn.mockRejectedValue(new Error('fail'))
    console.log(fn())  // Promise { <rejected> Error: fail at ... }
  })

  it('連続呼び出し時は異なる結果を返す', () => {
    const fn = vi.fn()
      .mockReturnValueOnce('1 回目')
      .mockReturnValueOnce('2 回目')
      .mockReturnValue('3 回目以降')

    // 1 回目の呼び出し
    console.log(fn())  // 1 回目

    // 2 回目の呼び出し
    console.log(fn())  // 2 回目

    // 3 回目の呼び出し
    console.log(fn())  // 3 回目以降

    // 4 回目の呼び出し
    console.log(fn())  // 3 回目以降
  })

  it('実装を渡す', () => {
    const add = vi.fn((a, b) => a + b)

    console.log(add(1, 2))  // 3

    add.mockImplementation((a, b) => a * b)
    console.log(add(1, 2))  // 2

    add.mockImplementationOnce((a, b) => a - b)
    console.log(add(1, 2))  // -1
  })

  describe('コールバック', () => {
    function fetchAndNotify(fetcher, onSuccess, onError) {
      return fetcher().then(onSuccess).catch(onError)
    }

    it('成功時に onSuccess が呼ばれる', async () => {
      const fetcher = vi.fn().mockResolvedValue('データ')
      const onSuccess = vi.fn()
      const onError = vi.fn()

      await fetchAndNotify(fetcher, onSuccess, onError)

      console.log(fetcher.mock.calls)    // [ [] ]
      console.log(onSuccess.mock.calls)  // [ [ 'データ' ] ]
      console.log(onError.mock.calls)    // []

      expect(fetcher).toHaveBeenCalled()
      expect(onSuccess).toHaveBeenLastCalledWith('データ')
      expect(onError).not.toHaveBeenCalled()
    })

    it('失敗時に onError が呼ばれる', async () => {
      const error = new Error('通信エラー')
      const fetcher = vi.fn().mockRejectedValue(error)
      const onSuccess = vi.fn()
      const onError = vi.fn()

      await fetchAndNotify(fetcher, onSuccess, onError)

      console.log(fetcher.mock.calls)    // [ [] ]
      console.log(onSuccess.mock.calls)  // []
      console.log(onError.mock.calls)    // [ [ Error 通信エラー at ... ] ]

      expect(fetcher).toHaveBeenCalled()
      expect(onSuccess).not.toHaveBeenCalled()
      expect(onError).toHaveBeenCalledWith(error)
    })
  })

  it('呼び出し履歴の中身を直接見る', () => {
    const fn = vi.fn((x) => x * 2)
    fn(1)
    fn(2)

    console.log(fn.mock.calls)     // [ [ 1 ], [ 2 ] ]
    console.log(fn.mock.results)   // [ { type: 'return', value: 2 }, { type: 'return', value: 4 } ]
    console.log(fn.mock.lastCall)  // [2]
  })

  describe('状態のリセット', () => {
    it('mockClear() は、呼び出し履歴を消し実装は残す', () => {
      const add = vi.fn((a, b) => a + b)

      console.log(add(1, 2))  // 3
      console.log(add.mock.calls)  // [ [ 1, 2 ] ]

      expect(add).toHaveBeenCalledWith(1, 2)
      expect(add).toHaveBeenCalledTimes(1)

      add.mockClear()

      // 呼び出し履歴が消える
      console.log(add.mock.calls)  // []
      expect(add).toHaveBeenCalledTimes(0)

      // 実装は残るので (a, b) => a + b が実行できる
      console.log(add(1, 2))  // 3
      expect(add).toHaveBeenCalledTimes(1)
    })

    it('mockReset() は、呼び出し履歴を消し実装はリセットする', () => {
      const fn = vi.fn()

      fn()
      console.log(fn.mock.results)  // [ { type: 'return', value: undefined } ]

      fn.mockReturnValue(3)

      console.log(fn())  // 3
      console.log(fn.mock.calls)  // [ [], [] ]

      expect(fn).toHaveBeenCalledTimes(2)

      fn.mockReset()

      // 呼び出し履歴が消える
      console.log(fn.mock.calls)  // []
      expect(fn).toHaveBeenCalledTimes(0)

      // 実装はリセットされるので、vi.fn() === undefined に戻る
      fn()
      console.log(fn.mock.results)  // [ { type: 'return', value: undefined } ]
    })

    it('mockRestore() は、呼び出し履歴を消し実装はリセットするが、vi.spyOn の場合は元の実装に戻る', () => {
      const total = {
        sum(a, b) {
          return a + b
        }
      }

      console.log(total.sum(1, 2))  // 3
      expect(total.sum(1, 2)).toBe(3)

      // total.sum を監視対象にしつつ、実装を差し替える
      const spy = vi.spyOn(total, 'sum').mockImplementation(() => 999)

      console.log(total.sum(2, 3))  // 999
      console.log(spy.mock.results) // [ { type: 'return', value: 999 } ]
      expect(spy).toHaveBeenCalledTimes(1)

      spy.mockRestore()

      // 呼び出し履歴が消える
      console.log(spy.mock.results)  // []
      expect(spy).toHaveBeenCalledTimes(0)

      // total.sum は 元の実装に戻る
      console.log(total.sum(1, 2))  // 3
      expect(total.sum(1, 2)).toBe(3)
    })
  })
})

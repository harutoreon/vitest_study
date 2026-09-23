import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('toHaveBeenCalledTimes', () => {
  it('コールバックが 1 回だけ呼ばれること', () => {
    const mockFn = vi.fn()

    mockFn()

    console.log(mockFn.mock.calls)  // [ [] ]
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('3 回呼ばれること', () => {
    const mockFn = vi.fn()

    mockFn()
    mockFn()
    mockFn()

    console.log(mockFn.mock.calls)  // [ [], [], [] ]
    expect(mockFn).toHaveBeenCalledTimes(3)
  })

  it('呼ばれないこと', function () {
    const mockFn = vi.fn()

    // 何も実行しない

    console.log(mockFn.mock.calls)  // []
    expect(mockFn).toHaveBeenCalledTimes(0)
  })

  it('リトライ処理が最大 3 回実行されること', () => {
    const fetchData = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce('success')

    async function retryFetch(fn, maxRetries = 3) {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await fn()
        } catch (error) {
          if (i === maxRetries - 1) throw error
        }
      }
    }

    return retryFetch(fetchData).then(() => {
      console.log(fetchData.mock.results)
      // => Promise rejected Error: fail
      //    Promise rejected Error: fail
      //    Promise resolved success
      expect(fetchData).toHaveBeenCalledTimes(3)
    })
  })
})

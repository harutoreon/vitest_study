import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useFakeTimers', () => {
  it('1秒後にコールバックが呼ばれること', () => {
    const callback = vi.fn()

    setTimeout(callback, 1000)

    vi.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalledOnce()
  })

  it('全タイマーがまとめて実行されること', () => {
    const log = []

    setTimeout(() => { log.push('A') }, 100)
    setTimeout(() => log.push('B'), 500)
    setTimeout(() => log.push('C'), 1000)

    vi.runAllTimers()

    expect(log).toEqual([ 'A', 'B', 'C' ])
  })

  it('現在キューのタイマーのみ実行すること', () => {
    const callback = vi.fn(() => {
      setTimeout(callback, 1000)
    })

    setTimeout(callback, 1000)

    vi.runOnlyPendingTimers()

    expect(callback).toHaveBeenCalledOnce()
  })

  it('現在の日付をモックできること', () => {
    vi.setSystemTime(new Date('2025-01-01T00:00:00Z'))

    expect(new Date().getFullYear()).toBe(2025)
  })

  it('非同期処理を含むタイマー', async () => {
    const fn = vi.fn()

    setTimeout(async() => {
      await Promise.resolve()
      fn()
    }, 1000)

    await vi.runAllTimersAsync()

    expect(fn).toHaveBeenCalled()
  })
})

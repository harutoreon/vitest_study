import { describe, expect, it, vi } from 'vitest'

describe('vi.advanceTimersByTime() with setInterval', () => {
  it('setInterval() の実行回数を確認', () => {
    vi.useFakeTimers()

    const callback = vi.fn()
    
    setInterval(callback, 1000)  // 1秒ごとに実行

    vi.advanceTimersByTime(3000)  // 3秒進める

    expect(callback).toHaveBeenCalledTimes(3)  // 3回実行されたことを確認
  })

  it('50ミリ秒ごとに変数iの値を返す', () => {
    let i = 0

    const callback = vi.fn().mockImplementation(() => console.log(++i))

    setInterval(callback, 50)

    vi.advanceTimersByTime(150)

    expect(callback).toHaveBeenCalledTimes(3)
  })
})

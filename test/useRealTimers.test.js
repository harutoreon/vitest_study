import { describe, expect, it, vi } from 'vitest'

describe('vi.useRealTimers with setTimeout', () => {
  it('Test useRealTimers', () => {
    vi.useFakeTimers()

    const mockFn = vi.fn()
      
    setTimeout(mockFn, 1000)
      
    vi.advanceTimersByTime(1000)

    expect(mockFn).toHaveBeenCalledTimes(1)
      
    vi.useRealTimers()
  })
})

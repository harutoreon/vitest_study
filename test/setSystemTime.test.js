import { it, expect, vi } from 'vitest'

it('Test setSystemTime', () => {
  const date = new Date(1998, 11, 19)

  vi.useFakeTimers()

  vi.setSystemTime(date)

  expect(Date.now()).toBe(date.valueOf())
  
  vi.useRealTimers()
})

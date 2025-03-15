import { it, expect, vi } from 'vitest'

const fn = vi.fn()

it('fn.mock.calls test', () => {
  fn('hello', 1)

  expect(fn.mock.calls[0]).toEqual(['hello', 1])
})

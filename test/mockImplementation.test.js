import { it, expect, vi } from 'vitest'

const fn = vi.fn()

it('mockImplementation test', () => {
  fn.mockImplementation((arg) => arg)
  fn('world', 2)

  expect(fn.mock.calls[0]).toEqual(['world', 2])
  expect(fn.mock.calls[0][0]).toEqual('world')
  expect(fn.mock.calls[0][1]).toEqual(2)
})

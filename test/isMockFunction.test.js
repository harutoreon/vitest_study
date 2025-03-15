import { it, expect, vi } from 'vitest'

const fn = vi.fn()

it('isMockFunction test', () => {  
  fn('hello', 1)
  
  expect(vi.isMockFunction(fn)).toBe(true)
})

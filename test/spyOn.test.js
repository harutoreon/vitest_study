import { it, expect, vi } from 'vitest'

let apples = 0
const cart = {
  getApples: () => 42
}

const spy = vi.spyOn(cart, 'getApples').mockImplementation(() => apples)

it('vi.spyOn test', () => {
  apples = 1

  expect(cart.getApples()).toBe(1)

  expect(spy).toHaveBeenCalled()
  expect(spy).toHaveReturnedWith(1)
})

import { expect, it, vi } from 'vitest'

it('spy function returns a product', () => {
  const sell = vi.fn((product) => ({ product }))

  sell('apples')

  expect(sell).toHaveReturnedWith({ product: 'apples' })
})
import { expect, it, vi } from 'vitest'

it('spy function returns bananas on second call', () => {
  const sell = vi.fn((product) => ({ product }))

  sell('apples')
  sell('bananas')

  expect(sell).toHaveNthReturnedWith(2, { product: 'bananas' })
})

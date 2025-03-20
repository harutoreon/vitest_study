import { expect, it, vi } from 'vitest'

const market = {
  buy(subject, amount) {
    // ...
  },
}

it('toHaveBeenCalled test', () => {
  const buySpy = vi.spyOn(market, 'buy')

  expect(buySpy).not.toHaveBeenCalled()

  market.buy('apples', 10)

  expect(buySpy).toHaveBeenCalled()
})
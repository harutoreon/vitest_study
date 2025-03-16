import { expect, it, vi } from 'vitest'

const market = {
  buy(subject, amount) {
    // ...
  },
}

it('spy function called two times', () => {
  const buySpy = vi.spyOn(market, 'buy')

  market.buy('apples', 10)
  market.buy('apples', 20)

  expect(buySpy).toHaveBeenCalledTimes(2)
})

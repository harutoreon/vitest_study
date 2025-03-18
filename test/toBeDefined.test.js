import { it, expect } from 'vitest'

function getApples() {
  return 3
}

it('値が undefined でないこと', () => {
  expect(getApples()).toBeDefined()
})

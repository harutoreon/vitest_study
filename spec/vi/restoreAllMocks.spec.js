import { describe, it, expect, vi, afterEach } from 'vitest'

const calculator = {
  add: (a, b) => a + b
}

describe('restoreAllMocks', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('add をモックに差し替える', () => {
    vi.spyOn(calculator, 'add').mockReturnValue(100)
    expect(calculator.add(1, 2)).toBe(100)
  })

  it('前のテストのモックが残ってない', () => {
    expect(calculator.add(1, 2)).toBe(3)
  })
})

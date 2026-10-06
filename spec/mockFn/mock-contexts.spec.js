import { describe, it, expect, vi } from 'vitest'

describe('mockFn-mock-contexts', () => {
  it('メソッドとして呼び出されたときの this を記録する', () => {
    const spy = vi.fn()
    const obj = { name: 'obj', method: spy }

    obj.method('a')

    expect(spy.mock.contexts).toHaveLength(1)
    expect(spy.mock.contexts[0]).toBe(obj)
  })
})
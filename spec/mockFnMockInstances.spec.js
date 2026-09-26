import { describe, it, expect, vi } from 'vitest'
import { Logger } from './logger'

vi.mock('./logger', () => {
  return { Logger: vi.fn() }
})

describe('mockFnMockInstances', () => {
  function setup() {
    return new Logger()
  }

  it('基本形', () => {
    const MockClass = vi.fn()

    const a = new MockClass()
    const b = new MockClass()

    console.log(MockClass.mock.instances)  // [ spy {}, spy {} ]
  })

  it('Logger が正しくインスタンス化される', () => {
    const instance = setup()

    console.log(instance)  // spy {}
    expect(Logger.mock.instances[0]).toBe(instance)
  })
})

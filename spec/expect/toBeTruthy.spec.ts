import { describe, it, expect } from 'vitest'

describe('toBeTruthy', () => {
  it('truthy な値', () => {
    expect(true).toBeTruthy()
    expect(1).toBeTruthy()
    expect('hello').toBeTruthy()
    expect([]).toBeTruthy()
    expect({}).toBeTruthy()
  })

  it('falsy な値', () => {
    expect(0).not.toBeTruthy()
    expect('').not.toBeTruthy()
    expect(null).not.toBeTruthy()
    expect(undefined).not.toBeTruthy()
  })
})

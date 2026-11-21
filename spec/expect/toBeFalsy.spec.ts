import { describe, it, expect } from 'vitest'

describe('toBeFalsy', () => {
  it('falsy な値', () => {
    expect(false).toBeFalsy()
    expect(0).toBeFalsy()
    expect('').toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()
    expect(NaN).toBeFalsy()
  })

  it('truthy な値', () => {
    expect([]).not.toBeFalsy()
    expect({}).not.toBeFalsy()
    expect('0').not.toBeFalsy()
  })
})

import { describe, it, expect, vi } from 'vitest'

describe('vi.mockReturnValue', () => {
  it('42が返ること', () => {
    const mock = vi.fn().mockReturnValue(42)

    expect(mock()).toEqual(42)
  })

  it('43が返ること', () => {
    const mock = vi.fn().mockReturnValue(43)

    expect(mock()).toEqual(43)
  })
})

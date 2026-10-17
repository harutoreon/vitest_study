import { describe, it, expect } from 'vitest'

describe('toThrow()', () => {
  function divide(a, b) {
    if (b === 0) throw new Error('0 で割ることはできません')
    return a / b
  }

  it('引数無しで検証', () => {
    expect(() => divide(1, 0)).toThrow()
  })

  it('文字列で検証', () => {
    expect(() => divide(1, 0)).toThrow('0 で割る')
  })

  it('正規表現で検証', () => {
    expect(() => divide(1, 0)).toThrow(/0 で割る/)
  })

  it('エラークラスで検証', () => {
    expect(() => divide(1, 0)).toThrow(Error)
  })
})

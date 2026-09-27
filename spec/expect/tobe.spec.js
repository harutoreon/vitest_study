import { describe, it, expect, vi } from 'vitest'

describe('toBe', () => {
  it('数値の比較', () => {
    const actual = 1 + 1
    const expected = 2
    expect(actual).toBe(expected)

    console.log(Object.is(1 + 1, 2))  // true
    console.log(1 + 1 === 2)  // true

    expect(1 + 1).toBe(2)
  })

  it('文字列の比較', () => {
    console.log(Object.is('hello', 'hello'))  // true
    console.log('hello' === 'hello')  // true

    expect('hello').toBe('hello')
  })

  it('真偽値の比較', () => {
    console.log(Object.is(true, true))  // true
    console.log(true === true)  // true

    expect(true).toBe(true)
  })

  it('null の比較', () => {
    console.log(Object.is(null, null))  // true
    console.log(null === null)  // true

    expect(null).toBe(null)
  })

  it('undefined の比較', () => {
    console.log(Object.is(undefined, undefined))  // true
    console.log(undefined === undefined)  // true

    expect(undefined).toBe(undefined)
  })

  it('中身が同じでも別インスタンスなら失敗する', () => {
    console.log(Object.is({ name: 'foo'}, { name: 'foo'}))  // false
    console.log({ name: 'foo'} === { name: 'foo'})  // false
    expect({ name: 'foo'}).not.toBe({ name: 'foo' })

    console.log(Object.is([1, 2, 3], [1, 2, 3]))  // false
    console.log([1, 2, 3] === [1, 2, 3])  // false
    expect([1, 2, 3]).not.toBe([1, 2, 3])
  })

  it('NaN の比較', () => {
    console.log(Object.is(NaN, NaN))  // true
    console.log(NaN === NaN)  // false

    expect(NaN).toBe(NaN)  // toBe の内部では Object.is() で判定しているため true となる
  })

  it('0 の比較', () => {
    console.log(Object.is(0, -0))  // false
    console.log(0 === -0)  // true

    expect(0).not.toBe(-0)  // toBe の内部では Object.is() で判定しているため false となる
  })
})

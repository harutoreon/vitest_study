import { describe, it, expect } from 'vitest'

describe('toBeUndefined', () => {
  it('undefined そのものを検証する', () => {
    expect(undefined).toBeUndefined()
  })

  it('存在しないプロパティは undefined になる', () => {
    const user = { name: 'Alice' }
    expect(user.age).toBeUndefined()
  })

  it('戻り値のない関数は undefined を返す', () => {
    // const noReturn = () => {}
    function noReturn () {}
    expect(noReturn()).toBeUndefined()
  })

  it('Array.find で見つからなけれは undefined を返す', () => {
    const result = [1, 2, 3].find((n) => n > 10)
    expect(result).toBeUndefined()
  })
})

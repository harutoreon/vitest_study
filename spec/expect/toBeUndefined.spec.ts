import { describe, it, expect } from 'vitest'

describe('toBeUndefined', () => {
  it('undefined そのものを検証する', () => {
    expect(undefined).toBeUndefined()
  })

  it('存在しないプロパティは undefined になる', () => {
    const user = { name: 'Alice' } as { name: string; age?: number}
    expect(user.age).toBeUndefined()
  })

  it('戻り値のない関数は undefined を返す', () => {
    const noReturn = () => {}
    expect(noReturn()).toBeUndefined()
  })

  it('Array.find で見つからなけれは undefined を返す', () => {
    const result = [1, 2, 3].find((n) => n > 10)
    expect(result).toBeUndefined()
  })

  it('TypeScript では型の絞り込みをしないため、別途ガードが必要', () => {
    const found = [1, 2, 3].find((n) => n === 2)

    expect(found).not.toBeUndefined()
    expect(found!.toFixed(1)).toBe('2.0')
  })
})

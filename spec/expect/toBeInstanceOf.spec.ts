import { describe, it, expect, vi } from 'vitest'

class Animal {}
class Dog extends Animal {}
class ValidationError extends Error {}

function validate(input: string) {
  if (!input) throw new ValidationError('入力が空です')
}

describe('toBeInstanceOf', () => {
  it('クラスのインスタンスであることを検証する', () => {
    const dog = new Dog()
    expect(dog).toBeInstanceOf(Dog)
  })

  it('継承元のクラスでも成功する', () => {
    const dog = new Dog()

    expect(dog).toBeInstanceOf(Animal)
  })

  it('無関係なクラスは失敗するので not と組み合わせる', () => {
    const dog = new Dog()

    expect(dog).not.toBeInstanceOf(Array)
  })

  it('ValidationError が投げられる', () => {
    expect(() => validate('')).toThrow(ValidationError)
  })

  it('例外オブジェクトの型とプロパティを両方確認する', () => {
    try {
      validate('')
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError)
      expect((error as ValidationError).message).toBe('入力が空です')
    }
  })

  it('組み込みオブジェクトの検証', () => {
    expect(new Date()).toBeInstanceOf(Date)
    expect([1, 2, 3]).toBeInstanceOf(Array)
    expect(new Map()).toBeInstanceOf(Map)
  })

  it('非同期処理の結果が Promise であることを検証する', () => {
    const fetchUser = vi.fn()
    fetchUser.mockResolvedValue({ id: 1, name: 'Alice'})

    expect(fetchUser()).toBeInstanceOf(Promise)
  })

  it('プリミティブ値には使えない', () => {
    expect('hello').not.toBeInstanceOf(String)
    expect(new String('hello')).toBeInstanceOf(String)  // ラッパーオブジェクト
  })
})

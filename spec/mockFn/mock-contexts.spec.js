import { describe, it, expect, vi } from 'vitest'

class Cart {
  items = []
  add(item) {
    this.items.push(item)
  }
}

describe('mockFn-mock-contexts', () => {
  it('メソッドとして呼び出されたときの this を記録する', () => {
    const spy = vi.fn()
    const obj = { name: 'obj', method: spy }

    obj.method('a')

    expect(spy.mock.contexts).toHaveLength(1)
    expect(spy.mock.contexts[0]).toBe(obj)
  })

  it('単独呼び出しでは this が undefined になる', () => {
    const spy = vi.fn()

    spy('a')

    console.log(spy.mock.contexts)
    expect(spy.mock.contexts[0]).toBeUndefined()
  })

  it('call で指定した this が記録される', () => {
    const spy = vi.fn()
    const ctx = { id: 1 }

    spy.call(ctx, 'a')

    console.log(spy.mock.contexts)
    expect(spy.mock.contexts[0]).toBe(ctx)
  })

  it('異なるオブジェクトから呼ばれた this を順に記録する', () => {
    const spy = vi.fn()
    const a = { name: 'a', run: spy }
    const b = { name: 'b', run: spy }

    a.run()
    b.run()

    console.log(spy.mock.contexts)
    expect(spy.mock.contexts).toEqual([a, b])
  })

  it('add が対象インスタンスに対して呼ばれる', () => {
    const addSpy = vi.spyOn(Cart.prototype, 'add')
    const cart = new Cart()

    cart.add('apple')

    console.log(addSpy.mock.contexts)  // [ Cart { items: [ 'apple' ] } ]
    console.log(addSpy.mock.calls)  // [ [ 'apple' ] ]
    expect(addSpy.mock.contexts[0]).toBe(cart)
    expect(addSpy.mock.calls[0]).toEqual(['apple'])
  })

  it('thisArg がコールバックに渡される', () => {
    const callback = vi.fn()
    const thisArg = { tag: 'ctx' }

    ;[1, 2].forEach(callback, thisArg)

    console.log(callback.mock.contexts)  // [ { tag: 'ctx' }, { tag: 'ctx' } ]
    expect(callback.mock.contexts).toEqual([thisArg, thisArg])
  })
})

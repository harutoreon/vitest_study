import { describe, it, expect, vi } from 'vitest'

async function getApples() {
  return 'apples'
}

const api = {
  async fetchUser(id: number) {
    return { id, name: 'Taro'}
  }
}

describe('toHaveResolvedWith', (): void => {
  it('スパイ関数が値で resolve した', async (): Promise<void> => {
    const spy = vi.fn(getApples)

    await spy()

    expect(spy).toHaveResolvedWith('apples')
  })

  it('fetchUser が期待するオブジェクトで resolve した', async (): Promise<void> => {
    const spy = vi.spyOn(api, 'fetchUser')

    await api.fetchUser(1)

    expect(spy).toHaveResolvedWith({ id: 1, name: 'Taro'})
  })
})

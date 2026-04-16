import { it, expect, vi } from 'vitest'

it('正しく挨拶されること', () => {
  const greet = vi.fn()

  greet('Alice', 25)

  expect(greet).toHaveBeenCalledWith('Alice', 25)
})

it('ユーザー作成時の引数チェック', () => {
  const createUser = vi.fn()

  createUser({ name: 'Bob', createAt: new Date() })

  expect(createUser).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Bob',
      createAt: expect.any(Date)
    })
  )
})

it('配列に「2」が含まれ「6」は含まれないこと', () => {
  const array = vi.fn()
  array([1, 2, 3, 4, 5])

  expect(array).toHaveBeenCalledWith(
    expect.arrayContaining([2])
  )
  expect(array).not.toHaveBeenCalledWith(
    expect.arrayContaining([6])
  )
})

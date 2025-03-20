import { describe, it, expect, vi } from 'vitest'

const person = {
  greet: (name) => `Hello ${name}`
}

const spy = vi.spyOn(person, 'greet').mockImplementation(() => 'mocked')

it('mockClearを実行する前の確認', () => {
  expect(person.greet('Alice')).toBe('mocked')
  expect(spy.mock.calls).toEqual([['Alice']])
})

it('mockClearを実行した後の確認', () => {
  spy.mockClear()

  expect(spy.mock.calls).toEqual([])
  expect(person.greet('Bob')).toBe('mocked')
  expect(spy.mock.calls).toEqual([['Bob']])
})

import { it, expect, vi } from 'vitest'

const fn = vi.fn()

it('fn.mock.results test', () => {
  fn('hello,', ' world')

  console.log(fn.mock.results)  // [ { type: 'return', value: undefined } ]

  fn.mockImplementation((arg1, arg2) => arg1 + arg2)
  fn('hello,', ' world')

  console.log(fn.mock.results)
  // [
  //   { type: 'return', value: undefined },
  //   { type: 'return', value: 'hello, world' }
  // ]
  
  expect(fn.mock.results[1].value).toEqual('hello, world')
})

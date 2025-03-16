import { it, expect, vi } from 'vitest'

const myMockFn = vi
  .fn(() => 'default')
  .mockImplementationOnce(() => 'first call')
  .mockImplementationOnce(() => 'second call')

it('vi.mockImplementationOnce test', () => {
  myMockFn()
  myMockFn()
  myMockFn()
  myMockFn()

  expect(myMockFn.mock.results[0].value).toEqual('first call')
  expect(myMockFn.mock.results[1].value).toEqual('second call')
  expect(myMockFn.mock.results[2].value).toEqual('default')
  expect(myMockFn.mock.results[3].value).toEqual('default')
})

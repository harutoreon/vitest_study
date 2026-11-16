import { describe, it, expect } from 'vitest'

describe('toContain', () => {
  it('配列に要素が含まれる', () => {
    const statuses: string[] = ['pending', 'processing', 'done']

    expect(statuses).toContain('done')
    expect(statuses).not.toContain('cancelled')
  })

  it('文字列に部分文字列が含まれること', () => {
    const message: string = '表面処理の登録に成功しました'

    expect(message).toContain('登録に成功')
  })

  it('Set に要素が含まれる', () => {
    const tags: Set<string> = new Set(['めっき', '塗装', '研磨'])

    expect(tags).toContain('塗装')
  })
})
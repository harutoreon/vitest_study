import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'

// axios をモック化
vi.mock('axios')

describe('axios のモックテスト', () => {
  it('GET リクエストのレスポンスをモックする', async () => {
    // モックのレスポンスを定義
    axios.get.mockResolvedValue({ data: { message: 'Hello, world!' } })

    // 実際に axios.get を呼び出す（モックが動作）
    const response = await axios.get('https://api.example.com/data')

    // レスポンスが期待通りか確認
    expect(response.data).toEqual({ message: 'Hello, world!' })
  })

  it('エラーレスポンスのモック', async () => {
    // エラーをスローするモック
    axios.get.mockRejectedValue(new Error('Network Error'))

    try {
      await axios.get('https://api.example.com/error')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Network Error')
    }
  })
})

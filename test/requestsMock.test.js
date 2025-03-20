import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'  // Node.js環境でのAPIモックを作成
import { http, HttpResponse } from 'msw'  // MSWのAPIモックを定義

// モックデータ
const posts = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body',
  },
  // ...
]

// APIのモック定義
export const restHandlers = [
  http.get('https://rest-endpoint.example/path/to/posts', () => {
    return HttpResponse.json(posts)
  }),
]

// モックサーバーのセットアップ
const server = setupServer(...restHandlers)

// サーバーのライフサイクル管理
// すべてのテストの前にモックサーバーを起動
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// すべてのテストの後にモックサーバーをシャットダウン
afterAll(() => server.close())

// 各テストの後にモックハンドラーをリセット
afterEach(() => server.resetHandlers())

async function fetchPosts() {
  const response = await fetch('https://rest-endpoint.example/path/to/posts')
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return response.json()
}

describe('fetchPosts', () => {
  it('should fetch posts successfully', async () => {
    const data = await fetchPosts()

    expect(data).toEqual([
      {
        userId: 1,
        id: 1,
        title: 'first post title',
        body: 'first post body',
      },
    ])
  })

  it('should handle errors', async () => {
    // 500 エラーを返すモックをセット
    server.use(
      restHandlers[0].resolver = () => new Response(null, { status: 500 })
    )

    await expect(fetchPosts()).rejects.toThrow('Failed to fetch posts')
  })
})

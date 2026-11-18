export type User = {
  id: number
  name: string
}

export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

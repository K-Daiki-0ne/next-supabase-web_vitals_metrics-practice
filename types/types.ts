export type Task = {
  id: string,
  created_at: string,
  title: string,
  usre_id: string | undefined
}

export type Notice = {
  id: string,
  created_at: string,
  content: string,
  usre_id: string | undefined
}
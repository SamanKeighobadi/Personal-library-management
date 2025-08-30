import { Hono } from 'hono'
import { db } from './db/migrate'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/genres", async (c) => {
  const genres = await db.query.genres.findMany()
  
  return c.json(genres,200)
})

export default app

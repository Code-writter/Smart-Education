import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { todoRoutes } from "./routes/todo.routes";
const app = new Hono()
app.use('*', logger())
app.use(cors())

app.get('/', (c) => {
    return c.json({
        msg : "suhdfaiousdh"
    })
} )

const apiRoutes =  app.basePath('/api/v1')
.route('/todo', todoRoutes)
// .route('/videos')


export default app
export type apiRoutes =  typeof apiRoutes 

import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { todoRoutes } from "./routes/todo.routes";
import { videoRoute } from "./routes/video.routes";
import { userRoutes } from "./routes/user.routes";
const app = new Hono()
app.use('*', logger())
app.use(cors())

app.get('/', (c) => {
    return c.json({
        msg : "suhdfaiousdh"
    })
} )

app.basePath('/api/v1')
.route('/todo', todoRoutes)
.route('/videos' , videoRoute)
.route('/user', userRoutes)

export default app


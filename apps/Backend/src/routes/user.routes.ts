import { Hono } from "hono";

export const userRoutes = new Hono()

// in time of user
.post('/in-time', (c) => {
    return c.json({
        msg : 'user enter time'
    })
})

// out time of user
.post('/out-time', (c) => {
    return c.json({
        msg : "out time of user"
    })
})


// get total time spend
.get('/user-timespend', (c) => {
    return c.json({
        msg : "get users time spend on site"
    })
})


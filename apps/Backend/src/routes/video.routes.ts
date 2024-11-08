import { Hono } from "hono";

export const videoRoute = new Hono()
.get('/videos', (c) => {
    return c.json({
        mdg : "get all videos"
    })
})
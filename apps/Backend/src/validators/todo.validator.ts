import {z} from 'zod'

const createTodoSchema = z.object({
    description : z.string().max(255)
})


export default (
    createTodoSchema
)
import { Hono } from "hono";
import createTodoSchema from "../validators/todo.validator";
import { zValidator } from "@hono/zod-validator";

type Todos = {
    id : number,
    description : string
}

const fakeTodos: Todos[] = [
    { id: 1, description: "Understand the basics of TypeScript" },
    { id: 2,  description: "Create a project using TypeScript and Hono" },
    { id: 3,  description: "Write unit tests for the project" }
];

export const todoRoutes = new Hono()

//all todos
.get('/todos', (c) => {

    return c.json(fakeTodos)
})

// add todo
.post('/add', zValidator('json', createTodoSchema) , async (c) => {
    const newTodo = c.req.valid('json');
    
    // fakeTodos.push(newTodo);
    return c.json({
        msg: `Added todo with id ${newTodo}`,
        todo: newTodo
    });
})
// get specific todo
.get('/todo:id{[0-9]+} ' , (c) => {
    const id = c.req.param("id")
    return c.json({
        msg : `Selected a specific todo ${id}`
    })
})

//is completed

.put('/todo:id{[0-9]+}', (c) => {

    return c.json({
        msg :"updated todo to completd"
    })
})

//update todo
.put('/update', (c) => {
    return c.json({
        ms :"Update the todo"
    })
})

.put()

// remove todo
.delete('/delete', (c) => {
    return c.json({
        msg :"Delete the todo"
    })
})
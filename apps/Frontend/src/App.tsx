
import { useEffect, useState } from "react"
import { Button } from "./components/ui/button"
import axios from "axios"
import { api } from "./utils/api"

export default function App(){
    const [data, setData] = useState<{ description: string }[]>([])
    useEffect(() => {
        async function fetchData () {
            // const res = await axios.get('https://backend2.abhishektiwari28032004.workers.dev/api/v1/todo/todos')  
            const res = await api.todo.todos.$get()
            setData(await res.json())
        } 
        fetchData()
    }, [])
    return (
        <div className=" h-screen w-full bg-gray-800" >
           <Button> WOrk </Button>
           <div>
                {JSON.stringify(data.map((todo) => {
                    return todo.description
                }))}
            </div> 
        </div>
    )
}


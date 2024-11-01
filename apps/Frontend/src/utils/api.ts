import { type apiRoutes } from  '../../../Backend/src/index'
import {hc} from 'hono/client'

const client = hc<(apiRoutes)>('/')

export const api = client.api.v1
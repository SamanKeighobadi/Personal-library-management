import { Context, Next } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { jwt} from 'hono/jwt'

const JWT_SECRET =  process.env.JWT_SECRET || ""

export const bearerAuth =  jwt({secret:JWT_SECRET})


export const adminOnly = async (context:Context,next:Next) =>{
    const userData = await context.get("jwtPayload")
    console.log('user',userData)
    if(!userData || userData.user.role !=="admin"){
        throw new HTTPException(403,{message: 'Access restricted to admins only' })
    }

    await next()
}
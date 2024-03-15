
import express, { NextFunction, Request, Response } from "express"
import { prisma } from "./db/prisma"
export const app = express()
const port = 3000

app.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = await prisma.user.findMany()
    res.send(data)
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
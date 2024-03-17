import { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../utils/jwt"

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
    const accesToken = req.headers.authorization?.replace(/^Bearer\s/, '')
    if (!accesToken) {
        return next()
    }
    const { decoded, expired } = verifyJwt(accesToken)
    if (decoded) {
        res.locals.user = decoded
        return next()
    }
    if (expired) {
        return next()
    }
    return next()
}

export default deserializedToken
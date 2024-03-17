import { Request, Response, NextFunction } from "express"


export const requireUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (user && user.role === "USER") {
        return next()
    }
    return res.sendStatus(403)
}

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (user && user.role === "ADMIN") {
        return next()
    }
    return res.sendStatus(403)
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    if (user) {
        return next()
    }
    return res.sendStatus(401)
}
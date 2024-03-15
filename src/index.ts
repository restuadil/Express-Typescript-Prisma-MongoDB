import express, { Request, Response } from "express";
import { UserRouter } from "./route/user-route";
import { errorMiddleware } from "./middleware/error-middleware";
export const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
app.use(UserRouter)
app.use(errorMiddleware)
// import { logger } from "./utils/logger";
// const port = 3000;
// app.listen(port, () => logger.info(`Server is listening on port ${port}`))
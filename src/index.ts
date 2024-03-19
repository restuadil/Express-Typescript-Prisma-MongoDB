import express, { Request, Response } from "express";
import { UserRouter } from "./route/user-route";
import { AuthRouter } from "./route/auth-route";
import { ProductRouter } from "./route/product-route";
import deserializedToken from "./middleware/deserializedToken";

export const app = express();

// import { errorMiddleware } from "./middleware/error-middleware";
// app.use(errorMiddleware)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializedToken)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
app.use("/api", UserRouter)
app.use("/api", AuthRouter)
app.use("/api", ProductRouter)
import { logger } from "./utils/logger";
const port = 3000;
app.listen(port, () => logger.info(`Server is listening on port ${port}`))
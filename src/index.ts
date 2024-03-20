import express, { Request, Response } from "express";
import { UserRouter } from "./route/user-route";
import { AuthRouter } from "./route/auth-route";
import { ProductRouter } from "./route/product-route";
import deserializedToken from "./middleware/deserializedToken";
import { errorMiddleware } from "./middleware/error-middleware";
import bodyParser from "body-parser";
import { logMiddleware } from "./middleware/log-middleware";


export const app = express();

// import { errorMiddleware } from "./middleware/error-middleware";
// app.use(errorMiddleware)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use(logMiddleware)
app.use(deserializedToken)
app.use("/api", UserRouter)
app.use("/api", AuthRouter)
app.use("/api", ProductRouter)
app.use("*", errorMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// import { logger } from "./utils/logger";
// const port = 3000;
// app.listen(port, () => logger.info(`Server is listening on port ${port}`))
import "express-async-errors";
import "reflect-metadata";
import express from "express";

import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRouter from "./routes/session.routes";
import userRouter from "./routes/user.routes";
import customersRouter from "./routes/costumers.routes";

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/register", userRouter);
app.use("/customer", customersRouter);
app.use("/login", sessionRouter);

app.use(handleErrorMiddleware);

export default app;

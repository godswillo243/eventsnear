import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { usersRouter } from "./modules/users/user.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

import "dotenv/config";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.use("/api/users", usersRouter);

app.use(errorMiddleware);

export default app;

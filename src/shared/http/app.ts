import express, { NextFunction, Request, Response } from "express";
import { AppError } from "shared/errors/AppError";

import "express-async-errors";
import "reflect-metadata";
import { routes } from "./routes";
import "@shared/container";

const app = express();

app.use(express.json());

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
});

export { app };

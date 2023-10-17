import express, { NextFunction, Request, Response } from "express";
import { AppError } from "shared/errors/AppError";

import { routes } from "./routes";

const app = express();

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
});

export { app };

import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import morgan from "morgan";
import { appDataSource } from "./database/app-data-source";
import rootRouter from "./routes";
import { errorHandler } from "./middlewares";

dotenv.config();

// establish database connection
appDataSource
  .initialize()
  .then(() => {
    console.log("🔒 [database]: Data Source has been initialized!");
  })
  .catch((err) => {
    console.error(
      "🚫 [database]: Error during Data Source initialization:",
      err
    );
  });

const app = express();

app.use(morgan("dev"));

// parse incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

// parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 [server]: Server is running on port ${PORT}`);
});

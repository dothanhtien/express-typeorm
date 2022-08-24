import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// parse incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

// parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }));

app.use("/", (req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`);
});

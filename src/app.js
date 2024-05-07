import express from "express";
import booksRouter from "./routes/books.routes.js";
import cors from "cors";

const app = express();
app.get('/',(req,res) => {
  res.send("Book Store Server Is Running")
})
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.use(express.json({ limit: "16kb" }));



app.use("/api", booksRouter);

export { app };

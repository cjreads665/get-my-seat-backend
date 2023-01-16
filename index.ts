import express, { Application, Request, Response } from "express";
const app: Application = express();
import ScrapController from "./controllers/ScrapController";
// import fs from 'fs-extra';

//middleware for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    ScrapController(6514047860);
    res.send("Server for seat featching");
});

const port = process.env.PORT || 8080;

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
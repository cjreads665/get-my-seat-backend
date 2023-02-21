import express, { Application, Request, Response } from "express";
const app: Application = express();
import ScrapController from "./controllers/ScrapController";
// import fs from 'fs-extra';

//middleware for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
    let k= await ScrapController(6715741541);
    console.log(k);
    // res.json(k)
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
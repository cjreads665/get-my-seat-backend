import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from 'cors';
import ScrapController from "./controllers/ScrapController";
// import fs from 'fs-extra';

//middleware for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // let test = 6116590703; //6715741541 //6116590703 //6316590028
  //   let k= await ScrapController(test);
  //   console.log(k);
  //   // res.json(k)
    res.send("Server for seat featching");
});

app.post("/get-status", async (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const {pnr} = req.body
  console.log(pnr);
  let result= await ScrapController(pnr);
  res.json(result)
});

const port = process.env.PORT || 8080;

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
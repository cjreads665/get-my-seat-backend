import express, { Application, Request, Response } from "express";
import cors from "cors";
import ScrapController from "./controllers/ScrapController";

const app: Application = express();
const port = process.env.PORT || 8080;

//middleware
//middleware for body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/',async (req:Request,res:Response)=>{
    await ScrapController(6514047864);
    res.send("Web scrapper created by cjreads665");
})

//messages after hosting
try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}

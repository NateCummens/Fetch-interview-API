import express, {Express, Request, Response} from "express";
import receipts from "./routes/receipts";

const app: Express = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use('/receipts', receipts);

app.all("*",(req:Request, res:Response)=>{
    res.status(404).send({error:"Page not found"})
})

app.listen(
    PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
)
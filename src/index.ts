import express, {Express, Request, Response} from "express";
import receipts from "./routes/receipts"
const app: Express = express();
const PORT = 3000;
app.use(express.json());

app.get('/hello', (req:Request, res:Response) =>{
    res.send("Hello World");
})

app.use('/receipts', receipts);

app.listen(
    PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
)
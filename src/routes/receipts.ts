import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/process", (req:Request, res:Response) =>{
    res.send("id")
})

router.get("/:id/points", (req:Request, res:Response) =>{
    res.send("points")
})

export default router
import { Router, Request, Response } from "express";

const router: Router = Router();

router.post("/process", (req:Request, res:Response) =>{
    const receipt = req.body
   let points = receipt.retailer.replace(/\W/g, '').length;
   if(receipt.total%1 === 0){
    points += 50;
   }
   if(receipt.total%.25 === 0){
    points += 25;
   }
   points += 5 * Math.floor(receipt.items.length/2);
   receipt.items.forEach((item:any)=>{
    if(item.shortDescription.trim().length %3 === 0){
        points += Math.ceil(item.price * 0.2);
    }
   })
   if(receipt.purchaseDate.slice(-2)%2 === 1){
    points += 6;
   }
   const time = receipt.purchaseTime.replace(":", '');
   if(time > 1400 && time < 1600){
    points += 10;
   }
   console.log(points)
    res.send("id")
})

router.get("/:id/points", (req:Request, res:Response) =>{
    res.send("points")
})

export default router
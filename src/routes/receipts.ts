import { Router, Request, Response } from "express";
import { ReceiptPoints } from "../interfaces/pointData";

const { v4: uuidv4 } = require('uuid');

const router: Router = Router();

let datastore:ReceiptPoints = {};

router.post("/process", (req:Request, res:Response) =>{
    //get the json receipt in the body
    const receipt = req.body
    //process the data in the receipt
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
   //generate a random ID for the amount of points
   const newId:string = uuidv4();

   //save data to datastore
   datastore[newId] = points

   console.log(datastore);

   //return ID
    res.send({id:newId})
})

router.get("/:id/points", (req:Request, res:Response) =>{
    //get ID from path
    const id = req.params.id;
    //return points attached to ID
    res.send({points:datastore[id]})
})

export default router
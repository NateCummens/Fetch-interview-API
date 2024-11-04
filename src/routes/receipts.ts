import {Router, Request, Response, NextFunction } from "express";
import { User} from "../interfaces/pointData";

const { v4: uuidv4 } = require('uuid');

const router: Router = Router();

// let datastore:ReceiptPoints = {};

let datastore: User = {}
let userId = uuidv4();
datastore[userId] = {
    receipts: {},
    amount: 0
}

router.post("/process", async (req:Request, res:Response): Promise<void> =>{
    try {
        //get the json receipt in the body
        const receipt = req.body
        if(!/^((?:19|20)\d\d)[- \/.](0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])$/.test(receipt.purchaseDate)){
            res.sendStatus(400);
            return;
        }
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
        const receiptId:string = uuidv4();

        //save data to datastore
        //1000, 500, 250
        datastore[userId].amount += 1;
        switch(datastore[userId].amount){
            case(1):
                points += 1000;
                break;
            case(2):
                points += 500;
                break;
            case(3):
                points += 250;
                break;
            default:
                break;
        }

        datastore[userId].receipts[newId] = points;
        console.log(datastore)

        //return ID
        res.send({id:newId})
    } catch (error) {
        res.sendStatus(400);
    }
})

router.get("/:id/points", async (req:Request, res:Response) =>{
    try {
        //get ID from path
        const id = req.params.id;
        //return points attached to ID
        res.send({points: datastore[userId].receipts[id]});

    } catch (error) {
        res.sendStatus(400);
    }

})

export default router
export interface ReceiptPoints{
    [key:string]:number
}

export interface User {
    [key:string]:{
        receipts: ReceiptPoints[]
        amount:number
    }

}
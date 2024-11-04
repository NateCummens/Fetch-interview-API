export interface User {
    [key:string]:{
        receipts:{
            [key:string]:number
        }
        amount:number
    }

}
import { Tax } from "./tax";

export class Operation{
    id: number;
    stockName : String;
    quantity : any;
    unitPrice: String;
    averagePrice: String;
    operationPrice: String;
    operationSell: String;
    purchasePrice: String;
    gainValue: String;
    totalPrice: number;
    taxes: Tax;
    darf: String;
}
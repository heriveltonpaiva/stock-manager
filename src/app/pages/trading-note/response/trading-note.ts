import { Tax } from "./tax";
import { Operation } from "./operation";

export class TradingNote{
    id: String;
    code: String;
    date: String;
    taxes: Tax;
    value: Number;
    valueSell: Number;
    valueBuy: Number;
    operationSell:String;
    operationList: Array<Operation>;
}
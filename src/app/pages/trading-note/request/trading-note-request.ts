import { OperationRequest } from './operation-request';
import { TaxRequest } from './tax-request';

export class TradingNoteRequest {
    code: String;
    broker: String;
    date: Date;
    value: String;
    operationSell: Number;
    taxes: TaxRequest;
    stocks: Array<OperationRequest>
}
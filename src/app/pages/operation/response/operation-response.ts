import { TotalOperationMonth } from 'app/pages/dashboard/response/total-operation-month';
import { Operation } from 'app/pages/trading-note/response/operation';

export class OperationResponse{
    operations: Array<Operation>;
    totalOperation: TotalOperationMonth;
}
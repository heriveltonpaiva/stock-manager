import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OperationComponent } from '../..//pages/operation/operation.component';
import { TradingNoteComponent } from '../..//pages/trading-note/trading-note.component';
import { StockPositionComponent } from 'app/pages/stock-position/stock-position.component';
import { TotalOperationComponent } from 'app/pages/total-operation/total-operation.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'operations',     component: OperationComponent },
    { path: 'note',           component: TradingNoteComponent },
    { path: 'stock-position', component: StockPositionComponent },
    { path: 'total-operation', component: TotalOperationComponent }
];

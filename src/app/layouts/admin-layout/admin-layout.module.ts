import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OperationComponent } from 'app/pages/operation/operation.component';
import { TradingNoteComponent } from 'app/pages/trading-note/trading-note.component';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ],
  declarations: [
    DashboardComponent,
    OperationComponent,
    TradingNoteComponent
  ]
})

export class AdminLayoutModule {}

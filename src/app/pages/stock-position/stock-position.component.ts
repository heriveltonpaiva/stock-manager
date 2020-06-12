import { Component, OnInit } from '@angular/core';
import { OperationService } from '../operation/operation.service';

@Component({
  selector: 'app-stock-position',
  templateUrl: './stock-position.component.html',
  styleUrls: ['./stock-position.component.css']
})
export class StockPositionComponent implements OnInit {

  stockPositions;
  
  constructor(public operationService: OperationService) { }

  ngOnInit(): void {
    this.stockPositions = [];
    this.loadList();
  }

  loadList(){
    this.operationService.findStockPosition().subscribe(resp => {
      this.stockPositions = resp;
      console.log(this.stockPositions);
    })
  }

}

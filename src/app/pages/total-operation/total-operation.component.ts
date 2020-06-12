import { Component, OnInit } from '@angular/core';
import { OperationService } from '../operation/operation.service';

@Component({
  selector: 'app-total-operation',
  templateUrl: './total-operation.component.html',
  styleUrls: ['./total-operation.component.css']
})
export class TotalOperationComponent implements OnInit {

  totalOperations;

  constructor(public operationService: OperationService) { }

  ngOnInit(): void {
    this.totalOperations = [];
    this.loadList();
  }

  loadList() {
    this.operationService.findTotalOperation().subscribe(resp => {
      this.totalOperations = resp;
      console.log(this.totalOperations);
    })
  }

}

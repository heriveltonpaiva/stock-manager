import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OperationRequest } from '../trading-note/request/operation-request';
import { OperationService } from './operation.service';
import { TradingNoteService } from '../trading-note/trading-note.service';
import { TradingNote } from '../trading-note/response/trading-note';
import { OperationSearchRequest } from './request/operation-search-request'
import { sample } from 'rxjs/operators';
import { isNull } from 'util';
import { OperationResponse } from './response/operation-response';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  form = new FormGroup({
    tradingNoteCode :new FormControl(),
    type: new FormControl("BUY"),
    code: new FormControl(""),
    quantity: new FormControl(),
    valueOperation: new FormControl()
  })
  formSearch = new FormGroup({
    tradingNoteCode :new FormControl(),
    type: new FormControl(),
    broker: new FormControl(),
    stockName: new FormControl(),
    month: new FormControl(6)
  })

  operations;
  comboTradingNote;
  noteSelected: TradingNote;
  totalOperation;
  
  constructor(public operationService: OperationService, public tradingNoteService: TradingNoteService) { }

  ngOnInit(): void {
    this.comboTradingNote = [];
    this.operations = [];
    this.noteSelected = new TradingNote();
    this.loadList();
  }

  onSubmit() {

    const op = new OperationRequest;

    op.tradingNoteCode = this.form.value["tradingNoteCode"];
    op.stockName = this.form.value["code"];
    op.quantity = this.form.value["quantity"];
    op.operationPrice = this.form.value["valueOperation"];
    op.type = this.form.value["type"];
    op.purchasePrice = this.form.value["purchaseValue"];
    
    this.operationService.save(JSON.stringify(op)).subscribe(resp => {
      console.log("OPERATION -> "+resp);
    });
    this.loadList();
    
  }

  showNoteTrading(e){
    this.tradingNoteService.findByCode(e.target.value).subscribe(resp =>{
      this.noteSelected = <TradingNote>resp;
      this.noteSelected.valueBuy = this.noteSelected.value.valueOf() - this.noteSelected.valueSell.valueOf();
    })
  }

  searchOperation(){
    const search = new OperationSearchRequest()
    
    search.tradingNoteCode = isNull(this.formSearch.value['tradingNoteCode'])? "" : this.formSearch.value['tradingNoteCode'];
    search.stockName = isNull(this.formSearch.value['stockName'])? "" : this.formSearch.value['stockName'];
    search.referenceMonth = isNull(this.formSearch.value['month'])? "" : this.formSearch.value['month'];
    search.typeOperation = isNull(this.formSearch.value['type'])? "" :this.formSearch.value['type']
    search.broker = isNull(this.formSearch.value['broker']) ? "" : this.formSearch.value['broker'];
    console.log(search);
    this.operationService.findAll(search).subscribe(resp => {
      this.operations = (<OperationResponse>resp).operations;
      this.totalOperation = (<OperationResponse>resp).totalOperation;
      console.log(resp);
    })
  }

  loadList(){
    const search = new OperationSearchRequest()
    search.tradingNoteCode = ""
    search.stockName = ""
    search.referenceMonth = "6";
    search.typeOperation = "";
    search.broker = "";

    this.operationService.findAll(search).subscribe(resp => {
      console.log(resp);
      this.operations = (<OperationResponse>resp).operations;
      this.totalOperation = (<OperationResponse>resp).totalOperation;
    })

    this.tradingNoteService.findAll().subscribe(resp => {
      this.comboTradingNote = resp;
    })
    console.log(this.comboTradingNote);
  }

}

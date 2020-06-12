import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OperationRequest } from '../trading-note/request/operation-request';
import { OperationService } from './operation.service';
import { TradingNoteService } from '../trading-note/trading-note.service';
import { TradingNote } from '../trading-note/response/trading-note';

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
    console.log(this.formSearch.value);
  }

  loadList(){
    this.operationService.findAll().subscribe(resp => {
      this.operations = resp;
    })

    this.tradingNoteService.findAll().subscribe(resp => {
      this.comboTradingNote = resp;
    })
    console.log(this.comboTradingNote);
  }

}

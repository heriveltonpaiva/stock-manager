import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TradingNoteService } from './trading-note.service';
import { TaxRequest } from './request/tax-request';
import { TradingNoteRequest } from './request/trading-note-request';
import { TradingNote } from './response/trading-note';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-trading-note',
  templateUrl: './trading-note.component.html',
  styleUrls: ['./trading-note.component.css']
})
export class TradingNoteComponent implements OnInit {

  form = new FormGroup({
    broker: new FormControl("XP"),
    date: new FormControl(Date.now.toString),
    codeNote: new FormControl(),
    value: new FormControl(),
    valueSell: new FormControl(),
    liquidation: new FormControl(),
    emoluments: new FormControl(),
    brokerage: new FormControl(),
    taxes: new FormControl(),
    incomingTax: new FormControl(),
    otherTaxes: new FormControl(),
  })
  notes; 
  successMessage;
  errorMessage;
  constructor(public tradingNoteService: TradingNoteService) { }

  ngOnInit(): void {
    this.loadList();
    this.successMessage = null;
    this.errorMessage = null;
  }

  onSubmit() {

    const tax = new TaxRequest;

    tax.brokerage = this.form.value["brokerage"];
    tax.emoluments = this.form.value["emoluments"];
    tax.liquidation = this.form.value["liquidation"];
    tax.otherTaxes = this.form.value["otherTaxes"];
    tax.taxes = this.form.value["taxes"];
    tax.incomingTax = this.form.value["incomingTax"];

    const note = new TradingNoteRequest;

    note.code = this.form.value['codeNote'];
    note.broker = this.form.value['broker'];
    note.date = this.form.value['date'];
    note.value = this.form.value["value"];
    note.operationSell = this.form.value['valueSell'];
    note.taxes = tax;
    note.stocks = [];


    console.log(JSON.stringify(note));
    this.tradingNoteService.save(JSON.stringify(note)).subscribe(resp => {
      console.log(resp);
      const note = <TradingNote>resp;
      this.errorMessage = null;
      this.successMessage = "Nota de negociação N° "+note.code+" cadastrada com sucesso.";
    }, e => {
      this.errorMessage = "Erro:"+e;
      this.successMessage = null;
    }
    );
    this.loadList();
   
  }

  chooseBroker(e){
    if(e.target.value == "CLEAR"){
      this.form.controls['otherTaxes'].disable();
      this.form.controls['brokerage'].disable();
      this.form.controls['taxes'].disable();
      this.form.controls['otherTaxes'].disable();
    }else{
      this.form.controls['otherTaxes'].enable();
      this.form.controls['brokerage'].enable();
      this.form.controls['taxes'].enable();
      this.form.controls['otherTaxes'].enable();
    }
  }

  loadList(){
    this.tradingNoteService.findAll().subscribe(resp => {
      this.notes = resp;
    }, e => this.errorMessage = "Erro:"+e)

  }

}

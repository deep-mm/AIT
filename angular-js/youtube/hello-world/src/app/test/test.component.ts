import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  public name = 'Deep';
  public myId = 'testId';
  public isDisabled = false;
  public hasError = false;
  public greeting = 'Welcome to Codevautaion';
  public displayName = false;

  public classMessage = {
    'text-success': !this.hasError,
    'text-error': this.hasError
  };

  public textStyle = {
    color: 'orange',
    fontStyle: 'italic'
  };

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    this.hasError = !this.hasError;
  }

  showAlert(val) {
     alert(val);
  }

}

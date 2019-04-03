import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diy-products',
  templateUrl: './diy-products.component.html',
  styleUrls: ['./diy-products.component.css']
})
export class DiyProductsComponent implements OnInit {

  public name = 'Deep';
  constructor() { }

  ngOnInit() {
  }

  greetUser() {
    return 'Hello ' + this.name;
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';
import { ProductAndUser } from 'src/app/Interfaces/ProductAndUser';

@Component({
  selector: 'app-ProductItem',
  templateUrl: './ProductItem.component.html',
  styleUrls: ['./ProductItem.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product;
  @Input() prodAndUser:ProductAndUser;
  prodname:string;
  
  constructor() { }

  ngOnInit() {
    
  }

  setClass(){
    var classes = 'is-buy';

    return classes
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/Product';

@Component({
  selector: 'app-ProductItem',
  templateUrl: './ProductItem.component.html',
  styleUrls: ['./ProductItem.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product;
  
  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ProductAndUser } from 'src/app/Interfaces/ProductAndUser';

@Component({
  selector: 'app-ShopCartItem',
  templateUrl: './ShopCartItem.component.html',
  styleUrls: ['./ShopCartItem.component.scss']
})
export class ShopCartItemComponent implements OnInit {
  @Input() prodAndUser:ProductAndUser;
  constructor() { }
  
  ngOnInit() {
  }

}

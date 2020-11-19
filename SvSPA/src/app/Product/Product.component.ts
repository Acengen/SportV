import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Interfaces/Product';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.scss']
})
export class ProductComponent implements OnInit {
  product:Product[] = [];
  constructor(private service:ProductService) { }

  ngOnInit() {
    this.service.GetProducts().subscribe(
      responseData => {
        for(let key in responseData){
          this.product.push(responseData[key]);
        }
        
      }
    );
  }

}

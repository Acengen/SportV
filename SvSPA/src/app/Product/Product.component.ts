import { Subscription } from 'rxjs';
import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Interfaces/Product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.scss']
})
export class ProductComponent implements OnInit {
  product:Product[] = [];
  ordered:boolean = false;
  productSb:Subscription;
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

  OrderByPrice() {
    this.service.OrderProductsByPrice().subscribe((resdata:Product[])=>{
      this.product = resdata;
    })
  }

  OrderByName() {
    this.service.OrderProductsByName().subscribe((resdata:Product[])=>{
      this.product = resdata;
    })
  }

  Submit(f:NgForm) {
    if(f.value.select === "2"){
      this.OrderByPrice();
    }
    if(f.value.select === "3"){
      this.OrderByName();
    }
  }
}

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
  product:Product[];
  ordered:boolean = false;
  productSb:Subscription;
  productParam:any = {};
  for:NgForm;
  productValue:any = [{name: "Puma"},{name:"Nike"},{name:"Adidas"}]

  constructor(private service:ProductService) { }

  ngOnInit() {
     this.loadProducts();
   
  }

  loadProducts() {
    this.service.GetProducts().subscribe(
      responseData => {
       
          this.product = responseData;
          this.productParam.productName = "Nike"
      }
    );
  }
  LoadProductName() {
    this.service.GetProducts(this.productParam).subscribe(
      (responseData:Product[]) => {
          this.product = responseData;
         
      }
    )
  }


 

 
}

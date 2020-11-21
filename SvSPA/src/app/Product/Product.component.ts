import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Interfaces/Product';
import { ProductAndUser } from '../Interfaces/ProductAndUser';

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.scss']
})
export class ProductComponent implements OnInit {
  product:Product[] = [];
  id:number;
  constructor(private service:ProductService) { }

  ngOnInit() {
    this.id = this.service.currentUser.id;
    this.service.GetProducts().subscribe(
      responseData => {
        for(let key in responseData){
          this.product.push(responseData[key]);
        }
      }
    );
    

    
  }

}

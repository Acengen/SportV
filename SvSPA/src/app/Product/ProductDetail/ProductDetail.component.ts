import { ProductService } from './../../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { User } from 'src/app/Interfaces/User';

@Component({
  selector: 'app-ProductDetail',
  templateUrl: './ProductDetail.component.html',
  styleUrls: ['./ProductDetail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product:Product;
  user:User;
  id:number;
  images = [];
  sizes = [];
  isclicked = false;
  sizeAdd = '';
 
  constructor(private route:ActivatedRoute,private service:ProductService) { }

  ngOnInit() {
    this.user = this.service.currentUser;
    this.route.params.subscribe(
      (param:Params) => {
        this.id = +param['id'];
        this.service.GetProductById(this.id).subscribe(resdata => {
          for(let key in resdata.productImages) {
            this.images.push(resdata.productImages[key].image);
          }
          for(let key in resdata.sizes) {
            this.sizes.push(resdata.sizes[key]);
          }
          this.product = resdata;
        })
      }
    )
  }

  clickTOAdd(size) {
      if(this.sizeAdd !== ""){
        return;
      }
      size.isClicked = true;
      if(size.isClicked) {
        this.sizeAdd = size.sizes
      }else{
        this.sizeAdd = '';
      }
  }

  SetClasses(size) {
    let classes = {
        'is-complete':size.isClicked,
    }
    return classes;
  }

  AddToCart() {
    this.service.AddToShopCart(this.id,this.user.id).subscribe(resdata => console.log(resdata));
  }

  removeSizeSelected() {
    this.sizeAdd = "";
    for(let key in this.sizes){
        this.sizes[key].isClicked = false;
    }
  }
 
}

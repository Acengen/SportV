import { Favorite } from './../../Interfaces/Favorite';
import { ProductService } from './../../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/app/Interfaces/Product';
import { User } from 'src/app/Interfaces/User';


@Component({
  selector: 'app-ProductDetail',
  templateUrl: './ProductDetail.component.html',
  styleUrls: ['./ProductDetail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product:Product;
  favorit:Favorite[] = [];
  user:User;
  id:number;
  images = [];
  sizes = [];
  sizeAdd = '';
  isAddedInCart:boolean;
  isadded:boolean = false;
  currentUser:User;
  messageIfUserDont:string;
  isFav:boolean;
  addToFav:boolean;
  constructor(private route:ActivatedRoute,private service:ProductService) { }

  ngOnInit() {
    this.user = this.service.currentUser;
    this.currentUser = this.service.currentUser;
    this.service.isFavEmitter.subscribe(isfav => this.isFav = isfav);
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
    );

    this.service.GetFavorite(this.user.id).subscribe(
      (resdata:Favorite[]) => {
        let filtere =  resdata.filter(v => {
        return v.pId === this.id;
        });
        if(filtere.length > 0){
          this.isFav = true;
          this.favorit = resdata;
        }
      }
    );

   
   
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
    if(this.currentUser == null) {
      this.messageIfUserDont = "Login/register";
    }
    this.service.AddToShopCart(this.id,this.user.id).subscribe(
    (resdata:any) => {this.isAddedInCart = true; setTimeout(()=>{this.isAddedInCart=false},2000)},
    error => console.log(error),
    () => setTimeout(() => {this.service.isAddEmitter.emit(this.isadded)},1000)
    );
  }

  removeSizeSelected() {
    this.sizeAdd = "";
    for(let key in this.sizes){
        this.sizes[key].isClicked = false;
    }
  }

  AddToFavorite() {
      if(!this.isFav){
        this.service.AddProductToFavorit(this.id, this.user.id).subscribe(
          resdata => {
            if(resdata.isFav){
                this.isFav = true;
                this.addToFav = true;
                setTimeout(()=>{this.addToFav=false},1000)
                this.service.isFavEmitter.emit(this.isFav); 
            }
          }
        );
      }

      if(this.isFav){
         this.service.RemoveFavorite(this.product.id).subscribe(resdata => {
           this.isFav = false;
           this.service.isFavEmitter.emit(this.isFav);
         })
      }
    
  }
 
}

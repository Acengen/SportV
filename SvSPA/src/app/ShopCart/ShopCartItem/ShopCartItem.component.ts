import { ProductService } from './../../Services/Product.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductAndUser } from 'src/app/Interfaces/ProductAndUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ShopCartItem',
  templateUrl: './ShopCartItem.component.html',
  styleUrls: ['./ShopCartItem.component.scss']
})
export class ShopCartItemComponent implements OnInit {
  @Input() prodAndUser:ProductAndUser[];
  currentUser:any;
  isRemoved:boolean;
  isToggle:boolean = false;
  constructor(private service:ProductService,private router:Router) { }
  
  ngOnInit() {
    this.currentUser = this.service.currentUser;
    this.service.currentUserEmitter.subscribe(user => this.currentUser = user);
  }


  removeProduct(id:number,index:number) {
    this.prodAndUser.splice(index,1);
    this.service.RemoveProductAndUser(id).subscribe(
      resdata => {
        if(this.prodAndUser.length < 1){
            this.router.navigate(["/products"])
        }
        
        setTimeout(()=>{
          this.isRemoved = false;
          this.service.isRemoverEmitter.emit(this.isRemoved);
        },500)
      },
      error => console.log(error)
      ); 
  }

  OnClick(prod:ProductAndUser) {
    prod.toggle = !prod.toggle;
    this.setClass(prod);
  }

  setClass(prod:ProductAndUser){
    let classes = '';
    
    if(!prod.toggle){
      return null;
    }
    if(prod.toggle){
      classes = 'activated'
    }

    return classes
  }

}

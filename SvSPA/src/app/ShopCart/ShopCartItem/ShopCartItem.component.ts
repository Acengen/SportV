import { Subscription } from 'rxjs';
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
  constructor(private service:ProductService,private router:Router) { }
  
  ngOnInit() {
  }


  removeProduct(id:number,index:number) {
    this.prodAndUser.splice(index,1);
    this.service.RemoveProductAndUser(id).subscribe(
      resdata => {
        if(this.prodAndUser.length < 1){
            this.router.navigate(["/products"])
        }
      },
      error => console.log(error)
      );
  }

}

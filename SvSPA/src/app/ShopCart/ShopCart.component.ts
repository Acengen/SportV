import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { ProductAndUser } from '../Interfaces/ProductAndUser';
import { Order } from '../Interfaces/Order';
import { NgForm } from '@angular/forms';
import { User } from '../Interfaces/User';

@Component({
  selector: 'app-ShopCart',
  templateUrl: './ShopCart.component.html',
  styleUrls: ['./ShopCart.component.scss']
})
export class ShopCartComponent implements OnInit {
  id:number;
  prodAndUser:ProductAndUser[] = [];
  order:any;
  sum:number;
  discount:number;
  oldPrice:number;
  currentUser:User;
  day = new Date().toLocaleString();
  isBuy:boolean;
  constructor(private service:ProductService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param:Params) => this.id = +param['id']
    )

    this.service.GetProductsByUser(this.id).subscribe((resdata:ProductAndUser[]) => {
      for(let key in resdata){
        this.prodAndUser.push(resdata[key]);
      }
    });

    this.currentUser = this.service.currentUser;
  }

  GetBill() {
    this.service.Getbill(this.currentUser.id).subscribe((resdata:Order[]) => {
       this.order = resdata['productOfUser'];
       this.oldPrice = resdata['sum'];
       this.sum = resdata['sum'];
      if(this.order.length >= 2) {
        this.discount = +(this.sum * 0.2).toFixed();
        this.sum = +(resdata['sum'] - (this.sum * 0.2)).toFixed();
      }
    })
  }

  Buy(f:NgForm) {
    this.isBuy = true;
    this.service.RemoveAllBuyFromSingleUser(this.currentUser.id).subscribe(res => {});
    setTimeout(()=> {
      this.isBuy = false;
      
      this.router.navigate(["/products"]);
    },3000)
  }

}

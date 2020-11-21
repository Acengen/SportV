import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { ProductAndUser } from '../Interfaces/ProductAndUser';

@Component({
  selector: 'app-ShopCart',
  templateUrl: './ShopCart.component.html',
  styleUrls: ['./ShopCart.component.scss']
})
export class ShopCartComponent implements OnInit {
  id:number;
  prodAndUser:ProductAndUser[] = [];
  constructor(private service:ProductService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param:Params) => this.id = +param['id']
    )

    this.service.GetProductsByUser(this.id).subscribe((resdata:ProductAndUser[]) => {
      for(let key in resdata){
        this.prodAndUser.push(resdata[key]);
      }
    })
  }

}

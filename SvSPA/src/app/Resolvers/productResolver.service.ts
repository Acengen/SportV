import { ProductService } from './../Services/Product.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from '../Interfaces/Product';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

constructor(private service:ProductService) { }

resolve(route:ActivatedRouteSnapshot, status: RouterStateSnapshot) : Observable<Product> | Promise<Product> | Product{
    return this.service.GetProductById(+route.params['id']);
}

}

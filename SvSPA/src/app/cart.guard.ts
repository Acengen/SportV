import { ProductService } from './Services/Product.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromReducer from './app.reducer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
  constructor(private service:ProductService,private router:Router,private store:Store<fromReducer.AppState>){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentuser = null;
    this.store.select('userLogin').pipe(map(res => res.user)).subscribe(
      r => {
       currentuser = r;
      }
    )

    if(!currentuser) {
        this.router.navigate(["/products"])
    }

    return true
    
  }
  
}

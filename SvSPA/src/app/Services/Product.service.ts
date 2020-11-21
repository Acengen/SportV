import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Product } from '../Interfaces/Product';
import { User } from '../Interfaces/User';
import {map, tap} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProductAndUser } from '../Interfaces/ProductAndUser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:5000/product/';
  jwtHelper = new JwtHelperService();
  decodedToken:any;
  currentUser:User;
  productAndUser:ProductAndUser[];
  counter:number;
  counterSub = new Subject();
  currentUserEmitter = new Subject();

constructor(private http: HttpClient) { }


GetProducts() {
  return this.http.get<Product>(this.baseURL);
}

GetProductById(id:number) {
  return this.http.get<Product>(this.baseURL + id)
} 

AuthRegister(user:User){
  return this.http.post('http://localhost:5000/api/auth/register', user);
}

Login(value:any) {
    return this.http.post("http://localhost:5000/api/auth/login", value).pipe(map((resdata:any)=> {
      localStorage.setItem("token", resdata.token);
      localStorage.setItem("user", JSON.stringify(resdata.user));
      this.currentUser = resdata.user;
      this.currentUserEmitter.next(this.currentUser);
      this.decodedToken = this.jwtHelper.decodeToken(resdata.token);
    }));
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token)
}


GetUser(id:number){
  return this.http.get('http://localhost:5000/api/user/' + id);
}

EditUser(id:number,user:User){
  return this.http.put("http://localhost:5000/api/user/" + id + "/edit", user);
}

AddToShopCart(productId:number, userId:number) {
  return this.http.post<ProductAndUser>("http://localhost:5000/api/user/product/" + productId + "/user/" + userId, {});
}

GetProductsByUser(uId:number) {
  return this.http.get<ProductAndUser[]>("http://localhost:5000/api/user/product/" + uId);
} 
  
}

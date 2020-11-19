import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Product } from '../Interfaces/Product';
import { User } from '../Interfaces/User';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:5000/product/';
  jwtHelper = new JwtHelperService();
  decodedToken:any;
  currentUser:User;

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
      this.decodedToken = this.jwtHelper.decodeToken(resdata.token);
    }));
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token)
}

}

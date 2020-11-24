import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Product } from '../Interfaces/Product';
import { User } from '../Interfaces/User';
import { tap } from 'rxjs/operators';
import { ProductAndUser } from '../Interfaces/ProductAndUser';
import { Order } from '../Interfaces/Order';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL = 'http://localhost:5000/product/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  counter: number;
  isAdded:boolean;
  isRemoved;

  isAddEmitter = new EventEmitter<boolean>();
  isRemoverEmitter = new EventEmitter<boolean>();
  counterEmitter = new EventEmitter<number>();
  currentUserEmitter = new EventEmitter<User>();

  constructor(private http: HttpClient) {}

  GetProducts() {
    return this.http.get<Product>(this.baseURL);
  }

  GetProductById(id: number) {
    return this.http.get<Product>(this.baseURL + id);
  }

  AuthRegister(user: User) {
    return this.http.post('http://localhost:5000/api/auth/register', user);
  }

  Login(value: any) {
    return this.http.post('http://localhost:5000/api/auth/login', value).pipe(
      tap((resdata: any) => {
        localStorage.setItem('token', resdata.token);
        localStorage.setItem('user', JSON.stringify(resdata.user));
        localStorage.setItem('prod', JSON.stringify(resdata.productsBuyUser));
        this.currentUser = resdata.user;
        this.currentUserEmitter.emit(this.currentUser);
        this.decodedToken = this.jwtHelper.decodeToken(resdata.token);
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  loggout() {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('prod');
    this.currentUserEmitter.emit(this.currentUser);
  }

  GetUser(id: number) {
    return this.http.get('http://localhost:5000/api/user/' + id);
  }

  EditUser(id: number, user: User) {
    return this.http.put(
      'http://localhost:5000/api/user/' + id + '/edit',
      user
    );
  }

  AddToShopCart(productId: number, userId: number) {
    return this.http.post<ProductAndUser[]>(
      'http://localhost:5000/api/user/product/' + productId + '/user/' + userId,
      {}
    ).pipe(tap((res)=> {
      this.isAdded = true;
      this.isAddEmitter.emit(this.isAdded);
      this.counter++;
      this.counterEmitter.emit(this.counter);
    }));
  }

  GetProductsByUser(uId: number) {
    return this.http.get<ProductAndUser[]>(
      'http://localhost:5000/api/user/product/' + uId
    );
  }

  RemoveProductAndUser(id: number) {
    return this.http.delete(
      'http://localhost:5000/api/user/productAndUser/' + id
    ).pipe(tap((res)=> {
      this.isRemoved = true;
      this.isRemoverEmitter.emit(this.isRemoved);
      this.counter--;
      this.counterEmitter.emit(this.counter);
    }));
  }
  OrderProductsByPrice() {
    return this.http.get<Product[]>(
      'http://localhost:5000/product/productsByprice'
    );
  }
  OrderProductsByName() {
    return this.http.get<Product[]>(
      'http://localhost:5000/product/productsByName'
    );
  }

  Getbill(id:number){
    return this.http.get<Order[]>("http://localhost:5000/api/user/productBuy/" + id);
  }

  RemoveAllBuyFromSingleUser(id:number) {
    return this.http.delete("http://localhost:5000/api/user/removeAllProductFromUser/user/" + id).pipe(tap((res)=> {
      this.counter = 0;
      this.counterEmitter.emit(this.counter);
    }));
  }

  CountProductsFromUser(id:number) {
  return this.http.get("http://localhost:5000/api/user/product/user/" + id);
  }

 
}

import { ProductService } from './Services/Product.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { User } from './Interfaces/User';
import { Store } from '@ngrx/store';

import * as fromReducer from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private service:ProductService,private store:Store<fromReducer.AppState>) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user:User = JSON.parse(localStorage.getItem('user'));
    if(token) {
      this.service.decodedToken = this.jwtHelper.decodeToken(token);
    }
    
    if(user) {
      this.service.currentUser = user;
    }
    
    
  }
}

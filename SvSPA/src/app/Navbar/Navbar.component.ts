import { ProductService } from './../Services/Product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromReducer from '../app.reducer'
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  currentUser:User;
  counter:number;
  isAdded:boolean;
  isRemoved:boolean;
  userSub:Subscription;
  token:string;
  
  constructor(private service:ProductService,private router: Router,private store:Store<fromReducer.AppState>) { }

  ngOnInit() {
    this.store.select('userLogin').pipe(map(resState => resState)).subscribe(res => {
      if(res) {
        this.currentUser = res.user
      }
    })
    this.service.isAddEmitter.subscribe((isadd:boolean)=> this.isAdded = isadd);
    this.service.isRemoverEmitter.subscribe((isremoved:boolean)=> this.isRemoved = isremoved);
    if(this.currentUser){
      this.service.CountProductsFromUser(this.currentUser.id).subscribe((count:number) => {this.counter = count; this.service.counter = this.counter});
    }
    this.service.counterEmitter.subscribe(count => this.counter = count);
  }


  loggedIn() {
    return this.service.loggedIn();
  }

  setClasses() {
    let classes;
    if(this.isAdded){
      classes = 'added';
    }
    if(this.isRemoved){
      classes = 'removed';
    }

    return classes;
  }

  Logout() {
     this.service.loggout();
  }


  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}

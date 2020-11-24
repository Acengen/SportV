import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser:User;
  counter:number;
  isAdded:boolean;
  isRemoved:boolean;
  
  constructor(private service:ProductService,private router: Router) { }

  ngOnInit() {
    this.currentUser = this.service.currentUser;
    this.service.currentUserEmitter.subscribe((current:User) => this.currentUser = current);
    this.service.isAddEmitter.subscribe((isadd:boolean)=> this.isAdded = isadd);
    this.service.isRemoverEmitter.subscribe((isremoved:boolean)=> this.isRemoved = isremoved);
    this.service.CountProductsFromUser(this.currentUser.id).subscribe((count:number) => {this.counter = count; this.service.counter = this.counter});
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
}

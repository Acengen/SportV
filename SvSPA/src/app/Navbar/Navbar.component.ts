import { ProductService } from './../Services/Product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductAndUser } from '../Interfaces/ProductAndUser';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser:User;
  userSub:Subscription;
  count:number;
  
  constructor(private service:ProductService,private router: Router) { }

  ngOnInit() {
    this.currentUser = this.service.currentUser;
    this.userSub = this.service.currentUserEmitter.subscribe((current:User) => this.currentUser = current);
    
    console.log("Navbar component: ",this.currentUser, "-------------------------------------------------------");  
  }


  loggedIn() {
    return this.service.loggedIn();
  }

  Logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.reload();
      this.router.navigate(["/products"])
  }


  ngOnDestroy() {
    
  }
}

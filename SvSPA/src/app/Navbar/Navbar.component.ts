import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser:User;
  userSub:Subscription;
  constructor(private service:ProductService,private router: Router) { }

  ngOnInit() {
    this.currentUser = this.service.currentUser;
    this.userSub = this.service.currentUserEmitter.subscribe((current:User) => this.currentUser = current)
  }


  loggedIn() {
    return this.service.loggedIn();
  }

  Logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(["/products"])
  }

}

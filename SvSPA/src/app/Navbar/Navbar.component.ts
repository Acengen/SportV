import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser:User;
  counter:number = 0;
  
  constructor(private service:ProductService,private router: Router) { }

  ngOnInit() {
    this.currentUser = this.service.currentUser;
    this.service.currentUserEmitter.subscribe((current:User) => this.currentUser = current);
  }


  loggedIn() {
    return this.service.loggedIn();
  }

  Logout() {
     this.service.loggout();
  }
}

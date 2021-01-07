import { ProductService } from './../Services/Product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { User } from '../Interfaces/User';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromReducer from '../RegistrationForm/login.reducer'
import * as fromActions from '../RegistrationForm/login.actions'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-RegistrationForm',
  templateUrl: './RegistrationForm.component.html',
  styleUrls: ['./RegistrationForm.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  regForm:FormGroup;
  loginForm:FormGroup;
  user:User;
  isRegistered:boolean;
  errorMsg:string;
  constructor(private service:ProductService,private router: Router,private store:Store<fromReducer.AppState>) { }

  ngOnInit() {
    this.RegisterformCreating();
    this.LoginFormCreating();
    this.store.select('userLogin').subscribe(r => {
      this.errorMsg = r.authError
    })
  }


  RegisterformCreating() {
    this.regForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(3)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMismatch)
  }

  LoginFormCreating() {
    this.loginForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(3)]),
    })
  }

  passwordMismatch(g:FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true}
  }


  Register() {
     this.user = Object.assign({}, this.regForm.value);
     this.service.AuthRegister(this.user).subscribe(
       resdata => this.isRegistered = true,
       error => console.log(error.error)
     )
  }

  Login() {
    this.store.dispatch(new fromActions.LoginStart(this.loginForm.value));
  }

  
}

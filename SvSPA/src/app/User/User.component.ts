import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../Services/Product.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.scss']
})
export class UserComponent implements OnInit {
  user:User;
  userId:number;
  edit:boolean;
  saveEdit:FormGroup;
  constructor(private service: ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.userId = +param['id'];
      }
    )
    
    this.getUser();
    this.editFormCreate();
  }

  getUser() {
    this.service.GetUser(this.userId).subscribe(
     ( resdata:User) => this.user = resdata
    )
  }

  SaveChanges() {
    this.user = Object.assign({}, this.saveEdit.value);
    this.service.EditUser(this.userId, this.user).subscribe(
      resdata => console.log('success')
    )
  }


  editFormCreate() {
    this.saveEdit = new FormGroup({
      about: new FormControl(''),
      email: new FormControl(''),
      nickName: new FormControl('')
    })
  };
}

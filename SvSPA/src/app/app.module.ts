import { routes } from './Approute.routing';
import { ProductDetailComponent } from './Product/ProductDetail/ProductDetail.component';
import { ProductItemComponent } from './Product/ProductItem/ProductItem.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './Product/Product.component';
import { NavbarComponent } from './Navbar/Navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './RegistrationForm/RegistrationForm.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [			
    AppComponent,
    ProductComponent,
    ProductItemComponent,
    ProductDetailComponent,
      NavbarComponent,
      RegistrationFormComponent,
      
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

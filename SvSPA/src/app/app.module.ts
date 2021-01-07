import { NotFoundComponent } from './404NotFound/404NotFound/404NotFound.component';
import { CartGuard } from './cart.guard';
import { ShopCartItemComponent } from './ShopCart/ShopCartItem/ShopCartItem.component';
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
import { JwtModule } from '@auth0/angular-jwt';
import { UserComponent } from './User/User.component';
import { ShopCartComponent } from './ShopCart/ShopCart.component';
import { StoreModule } from '@ngrx/store';
import { LoginReducer } from './RegistrationForm/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './RegistrationForm/login.effects';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [					
    AppComponent,
    ProductComponent,
    ProductItemComponent,
    ProductDetailComponent,
    NavbarComponent,
    RegistrationFormComponent,
    UserComponent,
    ShopCartComponent,
    ShopCartItemComponent,
    NotFoundComponent,
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({userLogin:LoginReducer}),
    EffectsModule.forRoot([LoginEffects]),
    JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:5000']
        }
    })
  ],
  providers: [CartGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { UserComponent } from './User/User.component';
import { RegistrationFormComponent } from './RegistrationForm/RegistrationForm.component';
import { ProductDetailComponent } from './Product/ProductDetail/ProductDetail.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './Product/Product.component';
import { ShopCartComponent } from './ShopCart/ShopCart.component';

export const routes: Routes = [
  { path:"", redirectTo:"/products", pathMatch:"full" },
  {path: "products", component:ProductComponent, children:[
    {path: "register" , component: RegistrationFormComponent},
  ]},
  {path: "products/:id", component:ProductDetailComponent},
  {path: "user/:id", component: UserComponent},
  {path: "yourcart/:id", component: ShopCartComponent}
];

export const ApprouteRoutes = RouterModule.forChild(routes);

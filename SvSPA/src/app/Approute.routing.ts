import { NavbarComponent } from './Navbar/Navbar.component';
import { ProductResolverService } from './Resolvers/productResolver.service';
import { NotFoundComponent } from './404NotFound/404NotFound/404NotFound.component';
import { RegisterGuardGuard } from './register-guard.guard';
import { CartGuard } from './cart.guard';
import { UserComponent } from './User/User.component';
import { RegistrationFormComponent } from './RegistrationForm/RegistrationForm.component';
import { ProductDetailComponent } from './Product/ProductDetail/ProductDetail.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './Product/Product.component';
import { ShopCartComponent } from './ShopCart/ShopCart.component';

export const routes: Routes = [
  { path:"", redirectTo:"/products", pathMatch:"full" },
  {path: "products", component:ProductComponent, children:[
    {path: "register" , component: RegistrationFormComponent, canActivate:[RegisterGuardGuard]},
  ]},
  {path: "products/:id", component:ProductDetailComponent, resolve:{product:ProductResolverService}},
  {path: "user/:id", component: UserComponent,canActivate:[CartGuard]},
  {path: "yourcart/:id", component: ShopCartComponent, canActivate:[CartGuard]},
  {path:'not-found', component:NotFoundComponent},
  {path:'**', redirectTo:'/not-found'}
];

export const ApprouteRoutes = RouterModule.forChild(routes);

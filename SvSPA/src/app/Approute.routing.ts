import { RegistrationFormComponent } from './RegistrationForm/RegistrationForm.component';
import { ProductDetailComponent } from './Product/ProductDetail/ProductDetail.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './Product/Product.component';

export const routes: Routes = [
  { path:"", redirectTo:"/products", pathMatch:"full" },
  {path: "products", component:ProductComponent, children:[
    {path: "register" , component: RegistrationFormComponent},
  ]},
  {path: "products/:id", component:ProductDetailComponent}
];

export const ApprouteRoutes = RouterModule.forChild(routes);

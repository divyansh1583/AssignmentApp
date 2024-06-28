import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginComponent } from './login/login.component';
import { SignupMaterialComponent } from './signup-material/signup-material.component';

const routes: Routes = [
  // {path:'',component:SignupFormComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupFormComponent},
  {path:'signup-mat',component:SignupMaterialComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

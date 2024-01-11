import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LicenseComponent } from './license/license.component';
import { AddlicenseComponent } from './addlicense/addlicense.component';
import { ViewlicenseComponent } from './viewlicense/viewlicense.component';
import { ViewlicenseUserComponent } from './viewlicense-user/viewlicense-user.component';
import { ActivateuserComponent } from './activateuser/activateuser.component';
import { ActivatedUserComponent } from './activated-user/activated-user.component';
import { RenewalComponent } from './renewal/renewal.component';
import { UserpageComponent } from './userpage/userpage.component';


const routes: Routes = [{ path: 'home', component: HomePageComponent },
{
  path: 'login',  component: LoginComponent,
 
},
{ path: 'register', component: RegisterComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{
  path: 'licenses',
  component: LicenseComponent,},
    { path: 'add', component: AddlicenseComponent },
    { path: 'view', component: ViewlicenseComponent },
    
{ path: 'userview/:uname', component:ViewlicenseUserComponent} ,
{path:'requestsoftware', component:ActivateuserComponent},
{
  path:'userpage',component:UserpageComponent
},
{path:'activateduser' ,component:ActivatedUserComponent} ,
{path:'renewal',component:RenewalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

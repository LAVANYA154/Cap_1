import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LicenseComponent } from './license/license.component';
import { AddlicenseComponent } from './addlicense/addlicense.component';
import { ViewlicenseComponent } from './viewlicense/viewlicense.component';
import { ViewlicenseUserComponent } from './viewlicense-user/viewlicense-user.component';
import { ActivateuserComponent } from './activateuser/activateuser.component';
import { ActivatedUserComponent } from './activated-user/activated-user.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { RenewalComponent } from './renewal/renewal.component';
import { UserpageComponent } from './userpage/userpage.component';// import { SearchComponent } from './license/search/search.component';
import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    LicenseComponent,
    AddlicenseComponent,
    ViewlicenseComponent,
    ViewlicenseUserComponent,
    ActivateuserComponent,
    ActivatedUserComponent,
    RenewalComponent,
    UserpageComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,HttpClientModule,CanvasJSAngularChartsModule,NgChartsModule,
    FontAwesomeModule, // Add FontAwesomeModule to your imports
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Add the icons to the library during initialization
    library.add(faEdit, faSave, faTimes, faTrash);
  }
 }

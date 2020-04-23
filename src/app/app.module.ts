import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips'
import {MatSelectModule} from '@angular/material/select';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ApiService} from "./_services/api.service";
// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { appRoutingModule } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './_components';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { ContactListComponent } from './contact-list/contact-list.component';
import { TestListComponent } from './test-list/test-list.component';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { TestSearchComponent } from './test-search/test-search.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatSelectModule,
        BrowserModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        AlertComponent,
        LandingpageComponent ,
        DashboardPageComponent ,
        ContactPageComponent ,
        TestPageComponent,
        PhoneMaskDirective ,
        ContactListComponent,
        TestListComponent,
        ContactSearchComponent,
        TestSearchComponent],
    providers: [
        MatDatepickerModule,
        ApiService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    exports: [
        PhoneMaskDirective
      ],
    bootstrap: [AppComponent]
})
export class AppModule { };




// @NgModule({
//   declarations: [
//     AppComponent,
//     ListUserComponent,
//     LoginComponent,
//     AddUserComponent,
//     EditUserComponent
//   ],
//   imports: [
//     BrowserModule,
//     routing,
//     ReactiveFormsModule,
//     HttpClientModule
//   ],
//   providers: [ApiService, {provide: HTTP_INTERCEPTORS,
//     useClass: TokenInterceptor,
//     multi : true}],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }





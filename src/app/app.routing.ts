import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ProfileComponent } from './profile';
import { AuthGuard } from './_helpers';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LandingpageComponent} from './landingpage/landingpage.component';
import { ContactSearchComponent } from './contact-search/contact-search.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { TestSearchComponent } from './test-search/test-search.component';
import { TestListComponent } from './test-list/test-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    {path:'dashboard', component:DashboardPageComponent},
    {path:'test', component:TestPageComponent},
    {path:'contact', component:ContactPageComponent},
    { path: 'landingpage', component: LandingpageComponent },
    { path: 'testlist', component: TestListComponent  },
    { path: 'testsearch', component: TestSearchComponent },
    { path: 'contactlist', component: ContactListComponent },
    { path: 'contactsearch', component: ContactSearchComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    
];

export const appRoutingModule = RouterModule.forRoot(routes);
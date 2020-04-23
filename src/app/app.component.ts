import { Component } from '@angular/core';
import { Router, NavigationStart} from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html',
styleUrls: ["./app.component.css"]})
export class AppComponent {
    currentUser: User;
    showHead: boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                if (event.url.includes('/dashboard') || event.url.includes('/contact')
                || event.url.includes('/profile')
                || event.url.includes('/test')) {
                    this.showHead = true;
                } else {
                    // console.log("not login page")
                    this.showHead = false;
                }
            }
        });
    }

    onActivate(event) {
        window.scrollTo(0,0);
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
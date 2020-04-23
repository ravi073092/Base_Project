import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new BehaviorSubject<any>(null);
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    getUserData(): BehaviorSubject<any> {
        return this.subject;
    }

    success(message: string, keepAfterRouteChange = true) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        // console.log("Success point "+ message);
        this.subject.next({ type: 'success', text: message });
        // this.myData.next(message);
    }

    successLogin(user: User, keepAfterRouteChange = true) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        // console.log("Success point "+ message);
        this.subject.next({ type: 'successlogin', User: user });
        // this.myData.next(message);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next(1);
    }
}
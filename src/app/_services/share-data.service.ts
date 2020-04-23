import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public userProfileStatus$ = new BehaviorSubject<any>(null);
  constructor() { }

  getProfileBannerUpdate(userDetails: Object) {
    // this.profileBannerUpdate = state;
    this.userProfileStatus$.next(userDetails);
  }
}

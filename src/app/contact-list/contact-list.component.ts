import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/_services/share-data.service';
import { ApiService } from '../_services/api.service';
import { AlertService } from '../_services';
import { Data } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  userEmail: string;
  contcats = [];

  constructor(private sharedService: ShareDataService,
              private apiService: ApiService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.getUserEmail();
    this.getContactsList();
  }

  getUserEmail() {
    this.sharedService.userProfileStatus$.subscribe((userData) => {
      this.userEmail = userData.email;
    });
  }

getContactsList() {
  this.apiService.viewContacts(this.userEmail).subscribe(
    (data: any) => {
      this.contcats = data.result;
      // console.log('user contacts list is', + this.contcats)
      this.alertService.success(data.message , true);
    },
    error => {
      this.alertService.error(error);
    });
}
}

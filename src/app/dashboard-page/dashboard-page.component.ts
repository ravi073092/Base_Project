import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../_services/share-data.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  userStatus: boolean;

  constructor(private router: Router,
              private sharedService: ShareDataService ) { }

  ngOnInit() {
      this.sharedService.userProfileStatus$.subscribe ((userDetails) => {
          if(userDetails.state === '' || userDetails.state  === null) {
              this.userStatus = true;
          } else {
              this.userStatus = false;
          }
      });
  }
}

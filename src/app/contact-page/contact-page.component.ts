import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AlertService } from '../_services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ShareDataService } from '../_services/share-data.service';
import { timeout } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  locationForm: FormGroup;
  locationFormValues: Object;
  contactFormValues: Object;
  userEmail: Object;
  typeOfVisit: Object;
  public fieldAlret: string ='This is filed is required'
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private sharedService: ShareDataService) { }

  ngOnInit() {
    this.alertService.clear();
    this.contactForm = this.formBuilder.group({
      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactPhoneNumber: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      purposeOfVisit: ['',],
      visitAddress: ['',],
      visitCity: ['',],
      visitState: ['',],
      visitPostalCode: ['',],
      visitCountry: ['',],
      dateOfVisit: ['', ]
    });
    this.locationForm = this.formBuilder.group({
      dateOfVisit: ['', Validators.required],
      purposeOfVisit: ['', Validators.required],
      visitAddress: ['', Validators.required],
      visitCity: ['', Validators.required],
      visitState: ['', Validators.required],
      visitCountry: ['', Validators.required],
      visitPostalCode: ['', Validators.required],

    });
  }
get contactValues() {
  return this.contactForm.controls;
}

  getUserEmail() {
    this.subscription = this.sharedService.userProfileStatus$.subscribe((data) => {
      this.userEmail = {
        'personEmail': data.email
      }
    });

  }

  onSubmitContactForm() {
    // reset alerts on submit
    this.alertService.clear();
    this.typeOfVisit = {
      'typeOfVisit': 'Person'
    }
    this.getUserEmail();
    this.contactFormValues = Object.assign({}, this.contactForm.value, this.userEmail, this.typeOfVisit);
    this.apiService.addContacts(this.contactFormValues).subscribe(
      (data: any) => {
        this.alertService.success('Contact added successfully!', true);
        window.scrollTo(0, 0)
      },
      error => {
        this.alertService.error(error);
        window.scrollTo(0, 0)
      });
    this.typeOfVisit = {
      'typeOfVisit': ''
    }
  }

  onSubmitLocationForm() {
    // reset alerts on submit
    this.alertService.clear();
    this.typeOfVisit = {
      'typeOfVisit': 'Location'
    }
    this.getUserEmail();
    this.locationFormValues = Object.assign({}, this.locationForm.value, this.userEmail, this.typeOfVisit);

    this.apiService.addContacts(this.locationFormValues).subscribe(
      (data: any) => {
        this.alertService.success('Location added successfully!', true);
        window.scrollTo(0, 0)
      },
      error => {
        this.alertService.error(error);
        window.scrollTo(0, 0)
      });
    this.typeOfVisit = {
      'typeOfVisit': ''
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
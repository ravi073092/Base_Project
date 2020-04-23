import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ShareDataService } from '../_services/share-data.service';
import { Subscription } from 'rxjs';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit, OnDestroy {
testForm: FormGroup;
testResultTypes = ['Negative','Positive','Unknown'];
testReasons = ['Covid19','Other'];
private subscription: Subscription = new Subscription();
testFormValues: Object;
userEmail: Object;
countryInfo: any[] = [];
  constructor( private apiService:ApiService,private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sharedService: ShareDataService,
    private country:CountriesService) { }
   
  ngOnInit() {
    this.alertService.clear();
    this.getCountries();
    // this.getUserEmail();
    this.testForm = this.formBuilder.group({
      testDate: ['', Validators.required],
      testType: ['', Validators.required],
      testResult: ['', Validators.required],
      testCity: ['',],
      testState: ['',],
      testCountry: ['',],
    });
  }

  get testValues() {
    return this.testForm.controls;
  }
  
  getCountries(){
    // console.log("get counrtry .." + this.country.allCountries());
    this.country.allCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
        // debugger;
        console.log('Country :', this.countryInfo[213]);
        for(let country in this.countryInfo){
            console.log(this.countryInfo[country].CountryName === this.alertService. getUserData().value.country);
        }
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  getUserEmail() {
    this.subscription = this.sharedService.userProfileStatus$.subscribe((data) => {
      this.userEmail = {
        'email': data.email
      }
    });
  }

  onSubmitTestForm() {
    // reset alerts on submit
    this.alertService.clear();
    this.getUserEmail();
    this.testFormValues = Object.assign({},this.testForm.value,this.userEmail);
    this.submitTest();
  }

  submitTest() {
    this.apiService.addTest(this.testFormValues)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.alertService.success('Test result added successfully!', true);
          window.scrollTo(0, 0)
          // this.router.navigate(['/dashboard']);
        },
        error => {
          this.alertService.error(error);
          window.scrollTo(0, 0)
        });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

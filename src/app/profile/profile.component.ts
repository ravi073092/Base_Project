import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {User} from '../_models/user'
import { AlertService, UserService, AuthenticationService } from '../_services';
import { ApiService } from '../_services/api.service';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {Subscription} from 'rxjs';
import { CountriesService } from '../countries.service';
import { ShareDataService } from '../_services/share-data.service';

@Component({ templateUrl: 'profile.component.html' })
export class ProfileComponent implements OnInit {
    // private observable: Observable<any>;
    private subscription: Subscription;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    // public myData: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    stateInfo: any[] = [];
    countryInfo: any[] = [];
    cityInfo: any[] = [];
    // country:CountriesService;
    user: any[] = [];
    returnUrl: string;
    countryName: string;
    public profileData:any;
    // constructor() { }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private apiService: ApiService,
        private country:CountriesService,
        private sharedService: ShareDataService
        // private country:CountriesService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.alertService.clear();
        // debugger;
        this.getCountries();
        this.subscription = this.sharedService.userProfileStatus$.subscribe((data) => {
           this.profileData = data;
          });
         let service = this.profileData;
         console.log('data is',this.profileData);
        //  debugger;
        if(typeof service.email !='undefined' && service.email){
            // return this.user;
            this.registerForm = this.formBuilder.group({
                firstName: [service.firstName, Validators.required],
                lastName: [service.lastName, Validators.required],
                email: [service.email, [Validators.required, Validators.email]],
                mobileNumber: [service.mobileNumber,], 
                homePhoneNumber: [service.homePhoneNumber,], 
                addressLine1: [service.addressLine1,] ,
                addressLine2: [service.addressLine2,] ,
                city: [service.city,] ,
                state: [service.state,] ,
                country: [service.country,] ,
                postalCode: [service.postalCode,] ,
                age:[service.age,],
                gender:[service.gender,] 
            });
         } else {
            //  console.log(this.country);
            this.registerForm = this.formBuilder.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                mobileNumber: ['',], 
                homePhoneNumber: ['',], 
                addressLine1: ['',] ,
                addressLine2: ['',] ,
                city: ['',] ,
                state: ['',] ,
                country: ['',],
                age:['',],
                postalCode:['',] 
         });
         
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onUpdate() {
        this.submitted = true;
       
        // reset alerts on submit
        this.alertService.clear();

       
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        // debugger;
        console.log(this.registerForm.value);
        this.registerForm.value.country =  this.countryInfo[ this.registerForm.value.country].CountryName;
        this.registerForm.value.state =  this.stateInfo[this.registerForm.value.state].StateName;
        this.apiService.updateUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    // debugger;
                    this.alertService.success(data.result, true);
                    this.router.navigate(['/profile']);
                    // this.router.navigate(['/profile']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
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
                console.log(this.countryInfo[country].CountryName === this.alertService.getUserData().value.country);
            }
          },
          err => console.log(err),
          () => console.log('complete')
        )
      }
    
      onChangeCountry(countryValue) {
        // console.log("get change country .." + countryValue);
        this.stateInfo=this.countryInfo[countryValue].States;
        this.cityInfo=this.stateInfo[0].Cities;
        // debugger;
        // console.log("country value " +  this.countryInfo[countryValue].CountryName);
        // this.registerForm.value.country =  this.countryInfo[countryValue].CountryName;
       
      }
    
      onChangeState(stateValue) {
        // console.log("get state change ..");
        this.cityInfo=this.stateInfo[stateValue].Cities;
        // console.log(this.stateInfo[stateValue].StateName);
        // this.registerForm.value.state =  this.stateInfo[stateValue].StateName;
       
      }
}

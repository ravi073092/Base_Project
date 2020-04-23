import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { ApiService } from '../_services/api.service';
import { User } from '../_models/user';
import { AppComponent } from '../app.component';
import { ShareDataService } from '../_services/share-data.service';


@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    otpForm: FormGroup;
    loading = false;
    loadingOtp:boolean;
    submitted:boolean;
    returnUrl: string;
    imgurl = "data:image/png;base64,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";
    // user:User;
    user: User = new User();

    constructor(
        private formBuilder: FormBuilder,
        private formBuilder2: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private apiService: ApiService,
        private shareDataService: ShareDataService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.alertService.clear();
        this.loginForm = this.formBuilder.group({
            // email: ['', Validators.required],
            // otp: ['', Validators.required]
            email: ['', [Validators.required, Validators.email]]
            // otp: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.otpForm = this.formBuilder2.group({
            // email: ['', Validators.required],
            otp: ['', Validators.required]
            // email: ['', [Validators.required, Validators.email]]
            // otp: ['', [Validators.required, Validators.minLength(6)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // console.log(this.returnUrl);
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    get o() { return this.otpForm.controls; }

    onRequest() {
        this.submitted = true;

        // debugger;
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.otpForm.invalid) {
            return;
        }
        // console.log(this.o.otp.value, this.f.email.value)
        this.loading = true;
        // debugger;
        this.user.email = this.f.email.value;
        this.user.otp = this.o.otp.value;
        this.loading = true;
        this.apiService.getLogin(this.user.email, this.user.otp)
            .subscribe(
                (data:any) => {
                    // debugger;
                    // this.router.navigate([this.returnUrl]);
                    // console.log("incoming data: " + data);
                    // this.alertService.success(data.result, true);
                    // this.user = data.result;
                    this.loading = false;
                    this.alertService.successLogin(data, true);
                    this.shareDataService.getProfileBannerUpdate(data.result);
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    onSubmit() {
        this.submitted = true;

        // debugger;
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loadingOtp = true;
        this.apiService.getToken(this.f.email.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.alertService.success(data.result, true);
                    this.loadingOtp = false;
                    window.scrollTo(0, 0)
                    // this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loadingOtp = false;
                });
    }
}

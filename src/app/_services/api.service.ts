import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {User} from "../_models";
import {Observable} from "rxjs/index";
import {ApiResponse} from "./api.response";
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin':'*',
    'X-PINGOTHER': 'pingpong'
  }),
};

@Injectable({ providedIn: 'root' })
export class ApiService {


  constructor(private http: HttpClient) { }
  baseUrlPerson: string = 'https://contacttrackerpersonapi.azurewebsites.net/contacttracker/users/';
  baseUrlTest: string = 'https://contacttrackertestapi.azurewebsites.net/';
  baseUrlContact: string = 'https://contacttrackercontactapi.azurewebsites.net/contacttracker/contacts';
  // baseUrl: string = 'http://192.168.0.23:8086/contacttracker/users/';

  login(loginPayload) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrlPerson + 'token/generate-token', loginPayload);
  }

  getUsers() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrlPerson);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrlPerson + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrlPerson, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrlPerson, user, httpOptions);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrlPerson + id);
  }

  getToken(email: string) : Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrlPerson+'otp/', email);
  }

  getLogin(email: string, otp:string) : Observable<User> {
    return this.http.post<User>(this.baseUrlPerson+'login/', {email,otp});
  }
  
  addTest(testData:object) : Observable<any> {
    return this.http.post<any>(this.baseUrlTest+'tests',testData,httpOptions);
  }
  
  addContacts(contactDetails: Object) : Observable<Object> {
    return this.http.post<Object>(this.baseUrlContact, contactDetails, httpOptions);  }

  viewContacts(email: string) {
    return this.http.get(this.baseUrlContact + '?email='+email);
  }
}

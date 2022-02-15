import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonData } from "../shared/common/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  ProceedLogin(userData: any) {
    return this.http.post(new CommonData().APIUrl + '/User/Authenticate', userData);
  }
}

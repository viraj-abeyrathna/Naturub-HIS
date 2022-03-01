import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, tap, delay, finalize } from 'rxjs/operators';
import { ApplicationUser } from '../model/application-user';
import { CommonData } from "../../shared/common/common";

interface LoginResult {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  isAdmin: boolean;
  userGroupID: number;
  accessToken: string;
  refreshToken: string;   
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  empty: any = null;

  isAuthenticated = false;


  private timer: Subscription | undefined;
  private _user = new BehaviorSubject<ApplicationUser>(this.empty);
  user$: Observable<ApplicationUser> = this._user.asObservable();

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      if (event.key === 'logout-event') {
        this.stopTokenTimer();
        this._user.next(this.empty);
      }
      if (event.key === 'login-event') {
        this.stopTokenTimer();
        this.http.get<LoginResult>(new CommonData().APIUrl + '/Account/User').subscribe((x) => {
          this._user.next({
            // username: x.userName,
            // role: x.role,
            // originalUserName: x.originalUserName 
            userID:x.userID,
            firstName:x.firstName,
            lastName:x.lastName,
            email:x.email,
            userName: x.userName,
            isAdmin:x.isAdmin,
            userGroupID:x.userGroupID
          });
        });
      }
    }
  }

  constructor(private router: Router, private http: HttpClient) {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }
  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResult>(new CommonData().APIUrl + '/Account/Login', { username, password })
      .pipe(
        map((x) => {
          this._user.next({
            // username: x.userName,
            // role: x.role,
            // originalUserName: x.originalUserName 
            userID:x.userID,
            firstName:x.firstName,
            lastName:x.lastName,
            email:x.email,
            userName: x.userName,
            isAdmin:x.isAdmin,
            userGroupID:x.userGroupID
          });
          this.isAuthenticated = true;
          this.setLocalStorage(x);
          this.startTokenTimer();
          return x;
        })
      );
  }


  logout() {
    this.http
      .post<unknown>(new CommonData().APIUrl + '/Account/logout', {})
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          this._user.next(this.empty);
          this.stopTokenTimer();
          this.router.navigate(['login']);
        })
      )
      .subscribe();
  }

  // refreshToken(){
    refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearLocalStorage();
      return of(null);
    } 

    return this.http.post<LoginResult>(`${new CommonData().APIUrl}/Account/refresh-token`, { refreshToken })
      .pipe(
        map((x) => {
          this._user.next({
            userID:x.userID,
            firstName:x.firstName,
            lastName:x.lastName,
            email:x.email,
            userName: x.userName,
            isAdmin:x.isAdmin,
            userGroupID:x.userGroupID
          });
          this.setLocalStorage(x);
          this.startTokenTimer();
          return x;
        })
      );
  }

  setLocalStorage(x: LoginResult) {
    localStorage.setItem('access_token', x.accessToken);
    localStorage.setItem('refresh_token', x.refreshToken);
    localStorage.setItem('login-event', 'login' + Math.random()); 
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random()); 

    this.isAuthenticated = false;
  }

  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private startTokenTimer() {
    const timeout = this.getTokenRemainingTime();
    // this.timer = of(true)
    //   .pipe(
    //     delay(timeout),
    //     tap(() => this.refreshToken().subscribe())
    //   )
    //   .subscribe();
    this.timer = of(true)
      .pipe(
        delay(timeout),
        tap(() => this.refreshToken())
      )
      .subscribe();

  }

  // ProceedLogin(userData: any) {
  //   return this.http.post(new CommonData().APIUrl + '/User/Authenticate', userData);
  // }

  private stopTokenTimer() {
    this.timer?.unsubscribe();
  }
}

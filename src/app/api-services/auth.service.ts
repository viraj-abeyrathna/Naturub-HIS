import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, finalize, map, Observable, of, Subscription, tap } from 'rxjs';
import { ApplicationUser } from '../model/application-user';
import { CommonData } from "../shared/common/common";

interface LoginResult {
  username: string;
  role: string;
  originalUserName: string;
  AccessToken: string;
  RefreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  empty: any = null;

 
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
        this.http.get<LoginResult>(new CommonData().APIUrl+'/User').subscribe((x) => {
          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
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
      .post<LoginResult>(new CommonData().APIUrl+'/Account/Login', { username, password })
      .pipe(
        map((x) => {
          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
          });
          this.setLocalStorage(x);
          this.startTokenTimer();
          return x;
        })
      );
  }


  logout() {
    this.http
      .post<unknown>(new CommonData().APIUrl+'/Logout', {})
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

  refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.clearLocalStorage();
      return of(null);
    }

    return this.http
      .post<LoginResult>(new CommonData().APIUrl+'/RefreshToken', { refreshToken })
      .pipe(
        map((x) => {
          this._user.next({
            username: x.username,
            role: x.role,
            originalUserName: x.originalUserName,
          });
          this.setLocalStorage(x);
          this.startTokenTimer();
          return x;
        })
      );
  }

  setLocalStorage(x: LoginResult) {
    localStorage.setItem('access_token', x.AccessToken);
    localStorage.setItem('refresh_token', x.RefreshToken);
    localStorage.setItem('login-event', 'login' + Math.random());
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('logout-event', 'logout' + Math.random());
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

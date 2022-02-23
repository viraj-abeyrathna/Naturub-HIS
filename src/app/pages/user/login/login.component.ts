import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  hide = true;
  checked = false;

  errorMessage: string;

  busy = false;
  loginError = false;
  private subscription: Subscription | undefined;


  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthService) {
    this.errorMessage = "";
  }


  UserNameControl = new FormControl("");
  PasswordControl = new FormControl("");


  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((x) => {
      if (this.route.snapshot.url[0].path === 'login') {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (x && accessToken && refreshToken) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigate([returnUrl]);
        }
      } // optional touch-up: if a tab shows login page, then refresh the page to reduce duplicate login
    });
  }

  validation() {
    this.errorMessage = "";
    if (!this.UserNameControl.value) {
      this.errorMessage = "Please Enter User Name !";
      return false;
    } else if (!this.PasswordControl.value) { 
      this.errorMessage = "Please Enter Password !";
      return false;
    }else{ 
      return true;
    }
  }

  login() {
    if (this.validation()) {
      this.busy = true;
      // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
      // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inventory/computer';

      this.authService
        .login(this.UserNameControl.value, this.PasswordControl.value)
        .pipe(finalize(() => (this.busy = false)))
        .subscribe(
          () => { 
            this.router.navigate(["/inventory/computer"]);
          },
          () => {
            this.loginError = true;
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

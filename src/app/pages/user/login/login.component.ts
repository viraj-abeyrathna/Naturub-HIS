import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api-services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  checked = false;

  messageClass = '';
  message = '';
  customerID: any;
  editData: any;
  responseData: any;

  constructor(private authService: AuthService, private route:Router) { }

  Login = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
  }

  ProceedLogin() {
    if (this.Login.valid) {
      this.authService.ProceedLogin(this.Login.value).subscribe(result => {
        if (result != null) {
          this.responseData = result;
          localStorage.setItem('token', this.responseData.jwtToken);
          this.route.navigate(['']);
        }
      });
    }
  }

}

import { Component } from '@angular/core'; 
import { async } from 'rxjs';
import { ApplicationUser, AuthService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  accessToken = localStorage.getItem('access_token');
  title = 'Naturub HIS';
  public userData!: ApplicationUser;

  // showFiller = false; 

  constructor(public authService:AuthService){

    // authService.user$.subscribe({
    //   next: a => {
    //     this.userData = a
    //   }
    // })

  }
  
}

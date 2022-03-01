import { Component } from '@angular/core'; 
import { async } from 'rxjs';
import { AuthService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  accessToken = localStorage.getItem('access_token');
  title = 'Naturub HIS';

  // showFiller = false; 

  constructor(public authService:AuthService){
    console.log(authService.user$); 
  }
  
}

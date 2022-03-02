import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from "../../shared/menu-items/menu-items";
import { ApplicationUser, AuthService } from '../../core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  showList: boolean = false;
  private _mobileQueryListener: () => void;

  centered = false;
  disabled = false;
  unbounded = false;

  panelOpenState = false;

  userData!: ApplicationUser;

  // radius: number;
  // color: string;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public menuItems: MenuItems, public authService: AuthService) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    authService.user$.subscribe({
      next: a => {
        this.userData = a
      }
    })

   

    // console.log(authService.user$);
    // console.log(authService.user$.subscribe({
    //   next: a => {
    //     this.aaa = a
    //   }
    // }))

    // console.log(this.aaa);

    // const subject: BehaviorSubject<string> = new BehaviorSubject("a");
    // console.log(subject.value); 
   }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleTag() {
    this.showList = !this.showList
  }

  logout() {
    this.authService.logout();
  }

}

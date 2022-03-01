import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AccessPointComponent } from './pages/inventory/access-point/access-point.component';
import { CctvComponent } from './pages/inventory/cctv/cctv.component';
import { ComputerComponent } from './pages/inventory/computer/computer.component';
import { DvrComponent } from './pages/inventory/dvr/dvr.component';
import { EthernetSwitchComponent } from './pages/inventory/ethernet-switch/ethernet-switch.component';
import { MobilePhoneComponent } from './pages/inventory/mobile-phone/mobile-phone.component';
import { MonitorComponent } from './pages/inventory/monitor/monitor.component';
import { PrinterComponent } from './pages/inventory/printer/printer.component';
import { ProjectorComponent } from './pages/inventory/projector/projector.component';
import { RouterDongleComponent } from './pages/inventory/router-dongle/router-dongle.component';
import { ScannerComponent } from './pages/inventory/scanner/scanner.component';
import { UpsComponent } from './pages/inventory/ups/ups.component';

import { LoginComponent } from "./pages/user/login/login.component";

// const routes: Routes = [
//   // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
//   // {path: 'dashboard', component: DashboardComponent}

//   {path: '', redirectTo: 'login', pathMatch: 'full'},
//   {path: 'login', component: LoginComponent}
// ];

const routes: Routes=[
  // { path: '', pathMatch: 'full',component: LoginComponent },
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },

  { path: 'inventory/computer', component: ComputerComponent, canActivate: [AuthGuard] },
  { path: 'inventory/ups', component: UpsComponent, canActivate: [AuthGuard] },
  { path: 'inventory/accesspoint', component: AccessPointComponent, canActivate: [AuthGuard] },
  { path: 'inventory/cctv', component: CctvComponent, canActivate: [AuthGuard] },
  { path: 'inventory/dvr', component: DvrComponent, canActivate: [AuthGuard] },
  { path: 'inventory/ethernetswitch', component: EthernetSwitchComponent, canActivate: [AuthGuard] },
  { path: 'inventory/mobilephone', component: MobilePhoneComponent, canActivate: [AuthGuard] },
  { path: 'inventory/monitor', component: MonitorComponent, canActivate: [AuthGuard] },
  { path: 'inventory/printer', component: PrinterComponent, canActivate: [AuthGuard] },
  { path: 'inventory/projector', component: ProjectorComponent, canActivate: [AuthGuard] },
  { path: 'inventory/routerdongle', component: RouterDongleComponent, canActivate: [AuthGuard] },
  { path: 'inventory/scanner', component: ScannerComponent, canActivate: [AuthGuard] },
 







  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const routingComponents = [DashboardComponent] 

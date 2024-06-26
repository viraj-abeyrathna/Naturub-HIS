import { NgModule } from '@angular/core'; 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { CoreModule } from './core/core.module';

// import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppRoutingModule } from './app-routing.module';

import { MasterModule } from "./pages/master/master.module"; 
import { InventoryModule } from "./pages/inventory/inventory.module"; 
import { MaintenanceModule } from "./pages/maintenance/maintenance.module"; 
// import { CommonData } from "./shared/common/common";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";

import { CommonData } from "./shared/common/common"; 

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './pages/user/login/login.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';  
import { ComputerDialogComponent } from './pages/inventory/computer/computer-dialog/computer-dialog.component';
import { JobCardDialogComponent } from './pages/inventory/common/job-card-dialog/job-card-dialog.component';

@NgModule({
  declarations: [
    AppComponent, 
    // routingComponents,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MasterModule, 
    InventoryModule, 
    MaintenanceModule,
    BrowserAnimationsModule, 
    SharedModule, 
    HttpClientModule,
    CoreModule,
    CommonData 
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  // providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ComputerDialogComponent,
    JobCardDialogComponent
  ]
})
export class AppModule { }

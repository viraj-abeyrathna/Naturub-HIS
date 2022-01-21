import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MasterModule } from "./pages/master/master.module"; 
import { InventoryModule } from "./pages/inventory/inventory.module"; 
 
// import { CommonData } from "./shared/common/common";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";

import { CommonData } from "./shared/common/common"; 

import { SidebarComponent } from './layout/sidebar/sidebar.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';  



@NgModule({
  declarations: [
    AppComponent, 
    routingComponents,
    SidebarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MasterModule, 
    InventoryModule, 
    BrowserAnimationsModule, 
    SharedModule, 
    HttpClientModule,
    CommonData 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

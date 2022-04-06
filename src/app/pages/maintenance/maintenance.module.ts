import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from "./maintenance-routing.module";
import { CommonData } from "../../shared/common/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { MaintenanceComponent } from './maintenance.component'; 
import { JobCardComponent } from './job-card/job-card.component'; 

@NgModule({
  declarations: [
    MaintenanceComponent, 
    JobCardComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    CommonData,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaintenanceModule { }

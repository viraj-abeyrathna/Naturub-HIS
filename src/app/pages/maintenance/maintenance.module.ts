import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from "./maintenance-routing.module";
import { CommonData } from "../../shared/common/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { MaintenanceComponent } from './maintenance.component';
 


@NgModule({
  declarations: [
    MaintenanceComponent,

  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    CommonData,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }

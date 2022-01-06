import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from "./master-routing.module";

import { MasterComponent } from './master.component';
import { DatasetComponent } from './dataset/dataset.component';
import { ComponentComponent } from './component/component.component';



@NgModule({
  declarations: [
    MasterComponent,
    DatasetComponent,
    ComponentComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }

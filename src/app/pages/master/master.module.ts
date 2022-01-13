import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from "./master-routing.module";
import { CommonData } from "../../shared/common/common";

import { MasterComponent } from './master.component';
import { DatasetComponent } from './dataset/dataset.component';
import { ComponentComponent } from './component/component.component';
import { FormsComponent } from './forms/forms.component';




@NgModule({
  declarations: [
    MasterComponent,
    DatasetComponent,
    ComponentComponent,
    FormsComponent,
  ],
  imports: [
    CommonModule,
    CommonData,
    MasterRoutingModule 
  ]
})
export class MasterModule { }

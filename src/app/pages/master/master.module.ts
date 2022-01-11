import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from "./master-routing.module";
import { CommonData } from "../../shared/common/common";

import { MasterComponent } from './master.component';
import { DatasetComponent } from './dataset/dataset.component';
import { ComponentComponent } from './component/component.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    MasterComponent,
    DatasetComponent,
    ComponentComponent,
  ],
  imports: [
    CommonModule,
    CommonData,
    MasterRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatListModule
  ]
})
export class MasterModule { }

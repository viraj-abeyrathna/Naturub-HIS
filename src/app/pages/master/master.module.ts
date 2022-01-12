import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from "./master-routing.module";
import { CommonData } from "../../shared/common/common";

import { MasterComponent } from './master.component';
import { DatasetComponent } from './dataset/dataset.component';
import { ComponentComponent } from './component/component.component';
import { FormsComponent } from './forms/forms.component';


import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list'; 
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';





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
    MasterRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule 
  ]
})
export class MasterModule { }

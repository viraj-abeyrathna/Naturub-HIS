import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import { MatSelectModule} from '@angular/material/select';


import { ComputerDialogComponent } from './computer-dialog.component';

@NgModule({
  declarations: [ComputerDialogComponent],
  entryComponents: [ComputerDialogComponent],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule
  ], 
})
export class ComputerDialogModule { }

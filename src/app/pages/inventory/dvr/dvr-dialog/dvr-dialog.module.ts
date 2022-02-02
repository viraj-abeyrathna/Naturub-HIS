import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { DvrDialogComponent } from './dvr-dialog.component';

@NgModule({
  declarations: [DvrDialogComponent],
  entryComponents: [DvrDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule 
  ],
})
export class ComputerDialogModule { }

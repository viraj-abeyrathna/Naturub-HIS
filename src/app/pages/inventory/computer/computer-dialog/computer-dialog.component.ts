import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-computer-dialog',
  templateUrl: './computer-dialog.component.html',
  styleUrls: ['./computer-dialog.component.css']
})
export class ComputerDialogComponent {

  constructor(public dialogRef: MatDialogRef<ComputerDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

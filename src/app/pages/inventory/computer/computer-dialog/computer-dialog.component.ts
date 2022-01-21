import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ComputerService } from 'src/app/api-services/computer.service';

@Component({
  selector: 'app-computer-dialog',
  templateUrl: './computer-dialog.component.html',
  styleUrls: ['./computer-dialog.component.css']
})
export class ComputerDialogComponent implements OnInit {

  constructor(private service: ComputerService,public dialogRef: MatDialogRef<ComputerDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  MainCategoryList: any = [];
  SubCategoryList: any = [];
  MainCategoryID : string = "0";
  filteredOptions: Observable<string[]> = new Observable<string[]>();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.FillMainCategory();
    this.FillSubCategory(0);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  FillMainCategory(){
    this.service.getMainCategory().subscribe((data: any) => {
      this.MainCategoryList = data;
    });
  }

  FillSubCategory(MainCategoryID: any){
    this.service.getSubCategory(this.MainCategoryID).subscribe((data: any) => {
      this.SubCategoryList = data;
    });
  }



 
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MasterService } from 'src/app/api-services/master.service';
import { InventoryService } from 'src/app/api-services/inventory.service';

export interface ComputerModel { 
  ModelName: string;
}

@Component({
  selector: 'app-computer-dialog',
  templateUrl: './computer-dialog.component.html',
  styleUrls: ['./computer-dialog.component.css']
})
export class ComputerDialogComponent implements OnInit {

  constructor(private masterService: MasterService, private inventoryService: InventoryService, public dialogRef: MatDialogRef<ComputerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  computerModels: ComputerModel[] = [];

  modelControl = new FormControl();

  filteredModels: Observable<ComputerModel[]> = new Observable<ComputerModel[]>();
 

  MainCategoryList: any = [];
  SubCategoryList: any = [];
  MainCategoryID: string = "0";


  ngOnInit(): void {
    this.FillComputerModels(); 
    this.FillMainCategory();   
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

  FillMainCategory() {
    this.masterService.getMainCategory().subscribe((data: any) => {
      this.MainCategoryList = data;
    });
  }

  FillSubCategory(MainCategoryID: number) { 
    this.masterService.getSubCategory(MainCategoryID).subscribe((data: any) => {
      this.SubCategoryList = data;
    });
  }

  FillComputerModels() {
    this.inventoryService.getComputerModels().subscribe((data: any) => {
      this.computerModels = data; 
    });

    this.filteredModels = this.modelControl.valueChanges.pipe(
      startWith<string | ComputerModel>(''),
      map(value => typeof value === 'string' ? value : value.ModelName),
      map(name => name ? this._filter(name) : this.computerModels.slice())
    );

  }

  private _filter(value: string): ComputerModel[] {
 
    const filterValue = value.toLowerCase();   
    return this.computerModels.filter(option=> option.ModelName.toLowerCase().includes(filterValue));



  }




}

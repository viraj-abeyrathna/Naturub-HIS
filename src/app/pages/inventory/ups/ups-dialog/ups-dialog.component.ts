import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
// import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'; 

import { MasterService } from 'src/app/api-services/master.service';
import { InventoryService } from 'src/app/api-services/inventory.service';
// import { HttpParams } from '@angular/common/http';
import { SnackBar } from "../../../../shared/common/snackBar";
import { Ups } from "../../../../model/ups";

export interface ComputerModel {
  ModelName: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-ups-dialog',
  templateUrl: './ups-dialog.component.html',
  styleUrls: ['./ups-dialog.component.css']
})
export class UpsDialogComponent implements OnInit {

  isADD = true;

  constructor(private masterService: MasterService, private _snackBar: SnackBar, private inventoryService: InventoryService, public dialogRef: MatDialogRef<UpsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  computerModels: ComputerModel[] = [];
  filteredModels: Observable<ComputerModel[]> = new Observable<ComputerModel[]>();


  MainCategoryList: any = [];
  SubCategoryList: any = [];

  MainCategoryID: string = "0";
  allComplete: boolean = false;

  DepartmentList: any = [];
  SectionList: any = [];
  BrandList: any = [];
  CapacityList: any = [];

  SubCategoryControl = new FormControl('', [Validators.required]);
  BrandControl = new FormControl('', [Validators.required]);
  CapacityControl = new FormControl('', [Validators.required]);
  FARControl = new FormControl('', [Validators.required]);
  DepartmentControl = new FormControl('', [Validators.required]);
  SectionControl = new FormControl('', [Validators.required]);
  SerialNoControl = new FormControl('', [Validators.required]);
  RemarkControl = new FormControl();

  matcher = new MyErrorStateMatcher(); 

  ngOnInit(): void {
    console.log(this.data.title);
    this.FillSubCategories(3); //Ups
    this.FillBrand(3); //Ups
    this.FillCapacity();
    this.FillDepartments();

    if (this.data.title == "EDIT UPS") {
       this.isADD = false;
       this.inventoryService.getUpsList(this.data.ItemID).subscribe(
        (data: any) => {
          this.SubCategoryControl.setValue(data[0]['SubCategoryID']);
          this.BrandControl.setValue(data[0]['BrandID']);
          this.CapacityControl.setValue(data[0]['CapacityID']);
          this.FARControl.setValue(data[0]['FARBarcodeNo']);
          this.DepartmentControl.setValue(data[0]['DepartmentID']);
          this.FillSections(data[0]['DepartmentID']);
          this.SectionControl.setValue(data[0]['SectionID']);
          this.SerialNoControl.setValue(data[0]['SerialNo']);
          this.RemarkControl.setValue(data[0]['Remark']);
          console.log(data[0]);
        } 
      );
    }  
  }

  FillSubCategories(MainCategoryID: number) {
    this.masterService.getSubCategory(MainCategoryID).subscribe((data: any) => {
      this.SubCategoryList = data;
    });
  }

  FillBrand(MainCategoryID: number) {
    this.masterService.getBrand(MainCategoryID).subscribe((data: any) => {
      this.BrandList = data;
    });
  }

  FillCapacity(){
    this.inventoryService.getCapacity().subscribe((data: any) => {
      this.CapacityList = data;
    });
  }

  FillDepartments() {
    this.masterService.getDepartment().subscribe((data: any) => {
      this.DepartmentList = data;
    });
  }

  FillSections(DepartmentID: number) {
    this.masterService.getSection(DepartmentID).subscribe((data: any) => {
      this.SectionList = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close({ SavedSuccess: false });
  }
 
  Save() {
    if (this.SubCategoryControl.invalid) {
      this._snackBar.warningSnackBar('Sub category is required !');
    } else if (this.BrandControl.invalid) {
      this._snackBar.warningSnackBar('Brand is required !');
    } else if (this.CapacityControl.invalid) {
      this._snackBar.warningSnackBar('Capacity is required !');
    } else if (this.FARControl.invalid) {
      this._snackBar.warningSnackBar('FARCode is required !');
    } else if (this.DepartmentControl.invalid) {
      this._snackBar.warningSnackBar('Department is required !');
    } else if (this.SectionControl.invalid) {
      this._snackBar.warningSnackBar('Section is required !');
    } else if (this.SerialNoControl.invalid) {
      this._snackBar.warningSnackBar('Serial No is required !');
    } else {

      const objUps = new Ups();
      objUps.MainCategoryID = 3 // Ups
      objUps.SubCategoryID = this.SubCategoryControl.value;
      objUps.FARBarcodeNo = this.FARControl.value;
      objUps.SectionID = this.SectionControl.value;
      objUps.BrandID = this.BrandControl.value;
      objUps.CapacityID = this.CapacityControl.value;
      objUps.SerialNo = this.SerialNoControl.value;
      objUps.Remark = this.RemarkControl.value;
      objUps.EnterdUserID = 1; // Temporary !!! 

      this.inventoryService.saveUps(objUps).subscribe(data => {
        if (data) {
          this.dialogRef.close({ SavedSuccess: true, ItemCode: data });
        } else {
          this.dialogRef.close({ SavedSuccess: false });
        }
      }); 

    }
  }

  Edit(ItemID: number) {
    console.log(ItemID);
    if (this.SubCategoryControl.invalid) {
      this._snackBar.warningSnackBar('Sub category is required !');
    } else if (this.BrandControl.invalid) {
      this._snackBar.warningSnackBar('Brand is required !');
    } else if (this.CapacityControl.invalid) {
      this._snackBar.warningSnackBar('Capacity is required !');
    } else if (this.FARControl.invalid) {
      this._snackBar.warningSnackBar('FARCode is required !');
    } else if (this.DepartmentControl.invalid) {
      this._snackBar.warningSnackBar('Department is required !');
    } else if (this.SectionControl.invalid) {
      this._snackBar.warningSnackBar('Section is required !');
    } else if (this.SerialNoControl.invalid) {
      this._snackBar.warningSnackBar('Serial No is required !');
    } else {

      const objUps = new Ups();
      objUps.ItemID = ItemID;
      objUps.MainCategoryID = 3 // Ups
      objUps.SubCategoryID = this.SubCategoryControl.value;
      objUps.FARBarcodeNo = this.FARControl.value;
      objUps.SectionID = this.SectionControl.value;
      objUps.BrandID = this.BrandControl.value;
      objUps.CapacityID = this.CapacityControl.value;
      objUps.SerialNo = this.SerialNoControl.value;
      objUps.Remark = this.RemarkControl.value;
      objUps.EnterdUserID = 1; // Temporary !!! 

      this.inventoryService.updateUps(objUps).subscribe(data => {
        if (data) {
          this.dialogRef.close({ SavedSuccess: true, ItemCode: data });
        } else {
          this.dialogRef.close({ SavedSuccess: false });
        }
      }); 

    }
  }



}

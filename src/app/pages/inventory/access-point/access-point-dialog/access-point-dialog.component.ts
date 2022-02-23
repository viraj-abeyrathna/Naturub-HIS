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
import { AccessPoint } from "../../../../core/model/accesspoint";

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


let IP_PATTERN = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

@Component({
  selector: 'app-access-point-dialog',
  templateUrl: './access-point-dialog.component.html',
  styleUrls: ['./access-point-dialog.component.css']
})
export class AccessPointDialogComponent implements OnInit {

  constructor(private masterService: MasterService, private _snackBar: SnackBar, private inventoryService: InventoryService, public dialogRef: MatDialogRef<AccessPointDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  isADD = true;
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
  IPAddressControl = new FormControl('', [Validators.required, Validators.pattern(IP_PATTERN)]);
  FARControl = new FormControl('', [Validators.required]);
  DepartmentControl = new FormControl('', [Validators.required]);
  SectionControl = new FormControl('', [Validators.required]);
  SerialNoControl = new FormControl('', [Validators.required]);
  ModelControl = new FormControl();
  RemarkControl = new FormControl();


  matcher = new MyErrorStateMatcher(); 

  ngOnInit(): void { 
    this.FillSubCategories(1005); //Access Point
    this.FillBrand(1005); //Access Point
    this.FillDepartments();

    if (this.data.ItemID != 0) {
      this.isADD = false;
      this.inventoryService.getAccessPointList(this.data.ItemID).subscribe(
       (data: any) => {
         this.SubCategoryControl.setValue(data[0]['SubCategoryID']);
         this.BrandControl.setValue(data[0]['BrandID']);
         this.IPAddressControl.setValue(data[0]['IPAddress']);
         this.ModelControl.setValue(data[0]['ModelName']);
         this.FARControl.setValue(data[0]['FARBarcodeNo']);
         this.DepartmentControl.setValue(data[0]['DepartmentID']);
         this.FillSections(data[0]['DepartmentID']);
         this.SectionControl.setValue(data[0]['SectionID']);
         this.SerialNoControl.setValue(data[0]['SerialNo']);
         this.RemarkControl.setValue(data[0]['Remark']); 
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
    }else if (this.IPAddressControl.invalid) {
      this._snackBar.warningSnackBar('IP address is required !');
    }else if (this.ModelControl.invalid) {
      this._snackBar.warningSnackBar('Model is required !');
    } else if (this.SerialNoControl.invalid) {
      this._snackBar.warningSnackBar('Serial No is required !');
    } else if (this.FARControl.invalid) {
      this._snackBar.warningSnackBar('FARCode is required !');
    } else if (this.DepartmentControl.invalid) {
      this._snackBar.warningSnackBar('Department is required !');
    } else if (this.SectionControl.invalid) {
      this._snackBar.warningSnackBar('Section is required !');
    } else {

      const objAccessPoint = new AccessPoint();
      objAccessPoint.MainCategoryID = 1005 //Access Point
      objAccessPoint.SubCategoryID = this.SubCategoryControl.value;
      objAccessPoint.BrandID = this.BrandControl.value;
      objAccessPoint.ModelName = this.ModelControl.value;
      objAccessPoint.IPAddress = this.IPAddressControl.value;
      objAccessPoint.SerialNo = this.SerialNoControl.value;
      objAccessPoint.FARBarcodeNo = this.FARControl.value;
      objAccessPoint.SectionID = this.SectionControl.value;
      objAccessPoint.SerialNo = this.SerialNoControl.value;
      objAccessPoint.Remark = this.RemarkControl.value;
      objAccessPoint.EnterdUserID = 1; // Temporary !!! 

      this.inventoryService.saveAccessPoint(objAccessPoint).subscribe(data => {
        if (data) {
          this.dialogRef.close({ SavedSuccess: true, ItemCode: data });
        } else {
          this.dialogRef.close({ SavedSuccess: false });
        }
      }); 

    }
  }

  Edit(ItemID: number) {
    
  }


}

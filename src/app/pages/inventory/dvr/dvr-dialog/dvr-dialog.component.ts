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
import { DVR } from "../../../../model/dvr";

export interface DvrModel {
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
  selector: 'app-dvr-dialog',
  templateUrl: './dvr-dialog.component.html',
  styleUrls: ['./dvr-dialog.component.css']
})
export class DvrDialogComponent implements OnInit {

  isADD = true;

  // userDetailsForm: FormGroup;
  
  constructor(private masterService: MasterService, private _snackBar: SnackBar, private inventoryService: InventoryService, public dialogRef: MatDialogRef<DvrDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  cctvModels: DvrModel[] = [];
  filteredModels: Observable<DvrModel[]> = new Observable<DvrModel[]>();


  MainCategoryList: any = [];
  SubCategoryList: any = [];

  MainCategoryID: string = "0";
  allComplete: boolean = false;

  DepartmentList: any = [];
  SectionList: any = [];
  BrandList: any = [];
  TypeList: any = [];

  SubCategoryControl = new FormControl('', [Validators.required]);
  BrandControl = new FormControl('', [Validators.required]);
  TypeControl = new FormControl('', [Validators.required]);
  FARControl = new FormControl('', [Validators.required]);
  DepartmentControl = new FormControl('', [Validators.required]);
  SectionControl = new FormControl('', [Validators.required]);
  SerialNoControl = new FormControl('', [Validators.required]);
  ModelControl = new FormControl();
  RemarkControl = new FormControl();

  matcher = new MyErrorStateMatcher(); 

  ngOnInit(): void {
    this.FillSubCategories(1004); //DVR
    this.FillBrand(1004); //DVR
    this.FillDepartments();
    this.FillDvrTypes();

    if (this.data.ItemID != 0) {
       this.isADD = false;
       this.inventoryService.getDVRList(this.data.ItemID).subscribe(
        (data: any) => {
          this.SubCategoryControl.setValue(data[0]['SubCategoryID']);
          this.BrandControl.setValue(data[0]['BrandID']);
          this.ModelControl.setValue(data[0]['ModelName']);
          this.TypeControl.setValue(data[0]['TypeID']);
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

  FillDvrTypes() {
    this.inventoryService.getDvrType().subscribe((data: any) => {
      this.TypeList = data;
    });
  } 

  FillComputerModels() {
    this.inventoryService.getCctvModels().subscribe((data: any) => {
      this.cctvModels = data;
    });

    this.filteredModels = this.ModelControl.valueChanges.pipe(
      startWith<string | DvrModel>(''),
      map(value => typeof value === 'string' ? value : value.ModelName),
      map(name => name ? this._filter(name) : this.cctvModels.slice())
    );
  }

  private _filter(value: string): DvrModel[] {

    const filterValue = value.toLowerCase();
    return this.cctvModels.filter(option => option.ModelName.toLowerCase().includes(filterValue));
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
    }else if (this.TypeControl.invalid) {
      this._snackBar.warningSnackBar('Type is required !');
    }else if (this.ModelControl.invalid) {
      this._snackBar.warningSnackBar('Modal Name is required !');
    }else if (this.FARControl.invalid) {
      this._snackBar.warningSnackBar('FARCode is required !');
    } else if (this.DepartmentControl.invalid) {
      this._snackBar.warningSnackBar('Department is required !');
    } else if (this.SectionControl.invalid) {
      this._snackBar.warningSnackBar('Section is required !');
    } else if (this.SerialNoControl.invalid) {
      this._snackBar.warningSnackBar('Serial No is required !');
    } else {

      const objDVR = new DVR();
      objDVR.MainCategoryID = 1004 // DVR
      objDVR.SubCategoryID = this.SubCategoryControl.value;
      objDVR.TypeID = this.TypeControl.value;
      objDVR.ModelName = this.ModelControl.value;
      objDVR.FARBarcodeNo = this.FARControl.value;
      objDVR.SectionID = this.SectionControl.value;
      objDVR.BrandID = this.BrandControl.value;
      objDVR.SerialNo = this.SerialNoControl.value;
      objDVR.Remark = this.RemarkControl.value;
      objDVR.EnterdUserID = 1; // Temporary !!! 

      this.inventoryService.saveDvr(objDVR).subscribe(data => {
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
    } else if (this.FARControl.invalid) {
      this._snackBar.warningSnackBar('FARCode is required !');
    } else if (this.DepartmentControl.invalid) {
      this._snackBar.warningSnackBar('Department is required !');
    } else if (this.SectionControl.invalid) {
      this._snackBar.warningSnackBar('Section is required !');
    } else if (this.SerialNoControl.invalid) {
      this._snackBar.warningSnackBar('Serial No is required !');
    } else {

      const objDVR = new DVR();
      objDVR.MainCategoryID = 1004 // DVR
      objDVR.SubCategoryID = this.SubCategoryControl.value;
      objDVR.TypeID = this.TypeControl.value;
      objDVR.FARBarcodeNo = this.FARControl.value;
      objDVR.ModelName = this.ModelControl.value;
      objDVR.SectionID = this.SectionControl.value;
      objDVR.BrandID = this.BrandControl.value;
      objDVR.SerialNo = this.SerialNoControl.value;
      objDVR.Remark = this.RemarkControl.value;
      objDVR.EnterdUserID = 1; // Temporary !!!

      this.inventoryService.saveCctv(objDVR).subscribe(data => {
        if (data) {
          this.dialogRef.close({ SavedSuccess: true, ItemCode: data });
        } else {
          this.dialogRef.close({ SavedSuccess: false });
        }
      }); 

    }
  }



}

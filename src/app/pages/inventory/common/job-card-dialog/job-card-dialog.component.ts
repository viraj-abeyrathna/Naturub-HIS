import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaintenanceService } from 'src/app/api-services/maintenance.service';
import { MasterService } from 'src/app/api-services/master.service';
import { AuthService } from 'src/app/core';
import { Maintenance } from 'src/app/core/model/maintenance';

@Component({
  selector: 'app-job-card-dialog',
  templateUrl: './job-card-dialog.component.html',
  styleUrls: ['./job-card-dialog.component.css']
})
export class JobCardDialogComponent implements OnInit {

  constructor(private masterService: MasterService, private maintenanceService: MaintenanceService, public dialogRef: MatDialogRef<JobCardDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public authService:AuthService) { }

  IsValidForm: boolean = true;

  MaintenanceTypeList: any = [];
  MaintenancePartList: any = [];


  matcher = new MyErrorStateMatcher();

  ItemCodeControl = new FormControl({ value: '', disabled: true });
  FARCodeControl = new FormControl({ value: '', disabled: true });
  MaintenanceTypeControl = new FormControl('', [Validators.required]);
  MaintenancePartControl = new FormControl('', [Validators.required]);
  RemarkControl = new FormControl();

  ngOnInit(): void {
    this.FillMaintenanceTypes();
    this.FillMaintenanceParts();
    this.ItemCodeControl.setValue(this.data.itemCode);
    this.FARCodeControl.setValue(this.data.farCode);
  }

  FillMaintenanceTypes() {
    this.masterService.getMaintenanceType().subscribe((data: any) => {
      this.MaintenanceTypeList = data.filter((item: { MaintenanceType: string; }) => item.MaintenanceType !== "Upgrade");  // Exclude item
    });
  }

  FillMaintenanceParts() {
    this.masterService.getMaintenancePart(this.data.subCategoryID).subscribe((data: any) => {
      this.MaintenancePartList = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Save(): void { 
    if (this.Validation()) { 
      const objMaintenance = new Maintenance();
      objMaintenance.ItemID = this.data.itemID;
      objMaintenance.SubCategoryID = this.data.subCategoryID;
      objMaintenance.MaintenanceTypeID = this.MaintenanceTypeControl.value;
      objMaintenance.MaintenancePartID = this.MaintenancePartControl.value;
      objMaintenance.Remark = this.RemarkControl.value;
      objMaintenance.EnterdUser = this.authService.userData.userID;


      this.maintenanceService.saveJobCard(objMaintenance).subscribe((data: any) => {
        if (data) { 
          this.dialogRef.close({ Success: true, JobCardNo: data });
        } else {
          this.dialogRef.close({ Success: false });
        }
      });
    }
  }

  Validation() {
    if (this.MaintenanceTypeControl.invalid) {
      this.IsValidForm = false;
      return false;
    } else if (this.MaintenancePartControl.invalid) {
      this.IsValidForm = false;
      return false;
    } else {
      this.IsValidForm = true;
      return true;
    }
  } 
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryService } from 'src/app/api-services/inventory.service';
import { MasterService } from 'src/app/api-services/master.service';

@Component({
  selector: 'app-job-card-dialog',
  templateUrl: './job-card-dialog.component.html',
  styleUrls: ['./job-card-dialog.component.css']
})
export class JobCardDialogComponent implements OnInit {

  constructor(private masterService: MasterService, private inventoryService: InventoryService, public dialogRef: MatDialogRef<JobCardDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  IsValidForm: boolean = true;

  MaintenanceTypeList: any = [];
  MaintenancePartList: any = [];


  matcher = new MyErrorStateMatcher();

  ItemCodeControl = new FormControl({ value: '', disabled: true }); 
  FARCodeControl = new FormControl({ value: '', disabled: true }); 
  MaintenanceTypeControl= new FormControl('',[Validators.required]);
  MaintenancePartControl= new FormControl('',[Validators.required]);
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

  FillMaintenanceParts(){
    this.masterService.getMaintenancePart(this.data.subCategoryID).subscribe((data: any) => {  
      this.MaintenancePartList = data;
  }); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Save(itemID:number):void{

  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

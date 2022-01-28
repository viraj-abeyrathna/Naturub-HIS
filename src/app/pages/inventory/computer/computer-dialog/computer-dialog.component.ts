import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { MasterService } from 'src/app/api-services/master.service';
import { InventoryService } from 'src/app/api-services/inventory.service';
// import { HttpParams } from '@angular/common/http';
import { Computer } from "../../../../model/computer";

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
  selector: 'app-computer-dialog',
  templateUrl: './computer-dialog.component.html',
  styleUrls: ['./computer-dialog.component.css']
})
export class ComputerDialogComponent implements OnInit {

  constructor(private masterService: MasterService, private _snackBar: MatSnackBar, private inventoryService: InventoryService, public dialogRef: MatDialogRef<ComputerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  computerModels: ComputerModel[] = [];
  filteredModels: Observable<ComputerModel[]> = new Observable<ComputerModel[]>();


  MainCategoryList: any = [];
  SubCategoryList: any = [];

  MainCategoryID: string = "0";
  allComplete: boolean = false;

  DepartmentList: any = [];
  SectionList: any = [];
  OperatingSystemList: any = [];
  VirusGuardList: any = [];
  ProcessorList: any = [];
  RAMList: any = [];


  // formControl = new FormControl('', [Validators.required, Validators.email]); 
  // MainCategoryControl = new FormControl('', [Validators.required]);
  SubCategoryControl = new FormControl('', [Validators.required]);
  FARControl = new FormControl('', [Validators.required]);
  ComputerNameControl = new FormControl('', [Validators.required]);
  IPAddressControl = new FormControl('', [Validators.required, Validators.pattern(IP_PATTERN)]);
  DepartmentControl = new FormControl('', [Validators.required]);
  SectionControl = new FormControl('', [Validators.required]);
  LoginUserControl = new FormControl('', [Validators.required]);
  UserControl = new FormControl('', [Validators.required]);
  OSControl = new FormControl('', [Validators.required]);
  VirusGuardControl = new FormControl('', [Validators.required]);
  ProcessorControl = new FormControl('', [Validators.required]);
  RAMControl = new FormControl('', [Validators.required]);
  CapacityControl = new FormControl('', [Validators.required]);
  ModelControl = new FormControl();
  RemarkControl = new FormControl();


  matcher = new MyErrorStateMatcher();

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  ngOnInit(): void {
    this.FillComputerModels();
    this.FillSubCategories(1); //Computer
    this.FillDepartments();
    this.FillOperatingSystems();
    this.FillProcessors();
    this.FillRAM();
  }

  // FillMainCategories() {
  //   this.masterService.getMainCategory().subscribe((data: any) => {
  //     this.MainCategoryList = data;
  //   });
  // }

  FillSubCategories(MainCategoryID: number) {
    this.masterService.getSubCategory(MainCategoryID).subscribe((data: any) => {
      this.SubCategoryList = data;
    });
  }

  FillComputerModels() {
    this.inventoryService.getComputerModels().subscribe((data: any) => {
      this.computerModels = data;
    });

    this.filteredModels = this.ModelControl.valueChanges.pipe(
      startWith<string | ComputerModel>(''),
      map(value => typeof value === 'string' ? value : value.ModelName),
      map(name => name ? this._filter(name) : this.computerModels.slice())
    );
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

  FillOperatingSystems() {
    this.inventoryService.getOperatingSystem().subscribe((data: any) => {
      this.OperatingSystemList = data;
    });
  }

  FillProcessors() {
    this.inventoryService.getProcessor().subscribe((data: any) => {
      this.ProcessorList = data;
    });
  }

  FillRAM() {
    this.inventoryService.getRAM().subscribe((data: any) => {
      this.RAMList = data;
    });
  }

  private _filter(value: string): ComputerModel[] {

    const filterValue = value.toLowerCase();
    return this.computerModels.filter(option => option.ModelName.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000
    });
  }

  Save() {
    if (this.SubCategoryControl.invalid) {
      this.openSnackBar('Sub category is required !');
    }
    else if (this.FARControl.invalid) {
      this.openSnackBar('FAR code is required !');
    }
    else if (this.ComputerNameControl.invalid) {
      this.openSnackBar('Computer name is required !');
    } else if (this.IPAddressControl.invalid) {
      this.openSnackBar('IP address is required !');
    } else if (this.DepartmentControl.invalid) {
      this.openSnackBar('Department is required !');
    } else if (this.SectionControl.invalid) {
      this.openSnackBar('Section is required !');
    } else if (this.LoginUserControl.invalid) {
      this.openSnackBar('Login user is required !');
    } else if (this.UserControl.invalid) {
      this.openSnackBar('User is required !');
    } else if (this.OSControl.invalid) {
      this.openSnackBar('Operating system is required !');
    } else if (this.VirusGuardControl.invalid) {
      this.openSnackBar('Virus guard is required !');
    } else if (this.ProcessorControl.invalid) {
      this.openSnackBar('Processor is required !');
    } else if (this.RAMControl.invalid) {
      this.openSnackBar('RAM is required !');
    } else if (this.CapacityControl.invalid) {
      this.openSnackBar('Capacity is required !');
    } else if (this.ModelControl.invalid) {
      this.openSnackBar('Model is required !');
    } else {


      const objComputer = new Computer();
      objComputer.MainCategoryID = 1 // Computer
      objComputer.SubCategoryID = this.SubCategoryControl.value;
      objComputer.FARBarcodeNo = this.FARControl.value;
      objComputer.ComputerName = this.ComputerNameControl.value;
      objComputer.IPAddress = this.IPAddressControl.value;
      objComputer.SectionID = this.SectionControl.value;
      objComputer.LoginUser = this.LoginUserControl.value;
      objComputer.AuthorizedUser = this.UserControl.value;
      objComputer.OperatingSystemID = this.OSControl.value;
      objComputer.IsVirusGuardActive = this.VirusGuardControl.value;
      objComputer.ProcessorID = this.ProcessorControl.value;
      objComputer.RAMID = this.RAMControl.value;
      objComputer.Capacity = this.CapacityControl.value;
      objComputer.ModelName = this.ModelControl.value;
      objComputer.Remark = this.RemarkControl.value;
      objComputer.EnterdUserID = 1; // Temporary !!!



      this.inventoryService.saveComputer(objComputer).subscribe(data => { 
        if (data) {  
          this.dialogRef.close({ SavedSuccess: true, ItemCode: data });
        } else {
          this.dialogRef.close({ SavedSuccess: false });
        }
      });


    }
  }


}

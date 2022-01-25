import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

import { MasterService } from 'src/app/api-services/master.service';
import { InventoryService } from 'src/app/api-services/inventory.service';

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

  constructor(private masterService: MasterService,private _snackBar: MatSnackBar, private inventoryService: InventoryService, public dialogRef: MatDialogRef<ComputerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

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
  MainCategoryControl = new FormControl('', [Validators.required]);
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

  matcher = new MyErrorStateMatcher();

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  ngOnInit(): void {
    this.FillComputerModels();
    this.FillMainCategories();
    this.FillDepartments();
    this.FillOperatingSystems();
    this.FillVirusGuards();
    this.FillProcessors();
    this.FillRAM();
  }
 
  FillMainCategories() {
    this.masterService.getMainCategory().subscribe((data: any) => {
      this.MainCategoryList = data;
    });
  }

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

  FillVirusGuards() {
    this.inventoryService.getVirusGuard().subscribe((data: any) => {
      this.VirusGuardList = data;
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

  openSnackBar() {
    this._snackBar.open('Warning !', 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  Save() {
    if (this.FARControl.valid) {
      alert("Valid");
    } else {
      this.openSnackBar();
    }
  }


}

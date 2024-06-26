import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ComputerDialogComponent } from './computer-dialog/computer-dialog.component';
import { InventoryService } from 'src/app/api-services/inventory.service';
import { SnackBar } from "../../../shared/common/snackBar";
import { Computer } from "../../../core/model/computer";
import { JobCardDialogComponent } from '../common/job-card-dialog/job-card-dialog.component';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core'; 

// export interface Computers {
//   ItemID: number;
//   ItemCode: string;
//   ComputerName: string;
//   IPAddress: string;
//   SubCategoryID: number;

//   MainCategoryID: number;
//   MainCategory: string;
//   SubCategory: string;
//   EnterdDate: Date;
//   EnterdUser: string;
//   LastModifiedDate?: Date;
//   LastModifiedUser?: string;
//   SectionID: number;
//   Section: string;
//   LoginUser: string;
//   User: string;
//   OperatingSystem: string;
//   VirusGuard: string;
//   Processor: string;
//   RAM: string;
//   ModelName: string;
//   FARCode: string;
//   Remark?: string;

// }

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  isLoading = true;

  accessToken:any = '';
  refreshToken:any = '';

  // test
  busy = false;
  values: string[] = [];
  // Test end

  dataSource: MatTableDataSource<Computer> = new MatTableDataSource();
  computers: Computer[] = [];
  columns: string[] = [
    'ItemCode',
    'ComputerName',
    'IPAddress',
    'SubCategory',
    'Department',
    'Section',
    'FARCode',
    'LoginUser',
    'AuthorizedUser',
    'ModelName',
    'OperatingSystem',
    'VirusGuard',
    'Processor',
    'RAM',
    'Capacity',
    'SerialNo',
    'Remark',
    'EnterdDate',
    'EnterdUser',
    'LastModifiedDate',
    'LastModifiedUser',
    'Actions'
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, private service: InventoryService,public dialog: MatDialog, private _snackBar: SnackBar,public authService:AuthService) {

 
    this.FillComputerList();

    
  
  }


  ngOnInit(): void {
    // this.FillComputers(); 
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');

 
  }

  // Test 
  getValues() {
    this.busy = true;
    this.service.Test().pipe(finalize(() => (this.busy = false)))
      .subscribe((x: string[]) => {
        this.values = x;
      });

    // this.http
    //   .get<string[]>(this.apiUrl)
    //   .pipe(finalize(() => (this.busy = false)))
    //   .subscribe((x) => {
    //     this.values = x;
    //   });
  }
  //Test - End

  FillComputerList() {
    this.service.getComputerList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<Computer>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        // return data;
      }
    );

    // this.dataSource = new MatTableDataSource(this.computers);

    // this.FillComputers();
  }

  openAddComputerDialog(): void {
    let dialogRef = this.dialog.open(ComputerDialogComponent, {
      width: '500px',
      data: {
        title: 'ADD COMPUTER',
        subtitle: 'Fill the computer details',
        isUpgrade: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.Success === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillComputerList();
        } else if (result.Success === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  openEditComputerDialog(_itemID: number): void {
    let dialogRef = this.dialog.open(ComputerDialogComponent, {
      width: '500px',
      data: {
        title: 'Edit Computer',
        subtitle: 'Change the computer details',
        itemID: _itemID,
        isUpgrade: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.Success === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully updated !', 4000)
          this.FillComputerList();
        } else if (result.Success === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  openRepairComputerDialog(_itemCode: string, _itemID: number, _farCode: string, _subCategoryID: number): void {
    let dialogRef = this.dialog.open(JobCardDialogComponent, {
      width: '500px',
      data: {
        title: 'JOB CARD',
        subtitle: 'Fill the computer maintenance details',
        itemID: _itemID,
        itemCode: _itemCode,
        farCode: _farCode,
        subCategoryID: _subCategoryID
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        if (result.Success === true) {
          this._snackBar.successSnackBar('(' + result.JobCardNo + ')  is successfully saved !', 4000)
          this.FillComputerList();
        } else if (result.Success === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  openUpgradeComputerDialog(_itemID: number): void {
    let dialogRef = this.dialog.open(ComputerDialogComponent, {
      width: '500px',
      data: {
        title: 'Upgrade Computer',
        subtitle: 'Upgrade the computer performance',
        itemID: _itemID,
        isUpgrade: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.Success === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully updated !', 4000)
          this.FillComputerList();
        } else if (result.Success === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  // FillComputers() {
  //   this.dataSource = new MatTableDataSource(this.computers);
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  JobCardDelete(ID: number) {
    if(confirm("Are you sure to delete? ")) {
      const objComputer = new Computer();
      objComputer.ItemID = ID;
      objComputer.LastModifiedUserID = this.authService.userData.userID;
      // console.log(this.authService.userData.userID);
      this.service.deleteComputer(objComputer).subscribe(data => {
        if (data) {
          this.FillComputerList();
        }
      });
    }
  }





}

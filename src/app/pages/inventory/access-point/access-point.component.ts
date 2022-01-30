import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InventoryService } from 'src/app/api-services/inventory.service';
import { SnackBar } from "../../../shared/common/snackBar";
import { AccessPointDialogComponent } from './access-point-dialog';

export interface AccessPoint {
  ItemID: number;
  ItemCode: string;
  MainCategoryID: number;
  MainCategory: string;
  SubCategoryID: number;
  SubCategory: string;
  EnterdDate: Date;
  EnterdUser: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  SectionID: number;
  Section: string;
  LoginUser: string;
  User: string;
  ModelName: string;
  FARCode: string;
  Remark?: string;
}

@Component({
  selector: 'app-access-point',
  templateUrl: './access-point.component.html',
  styleUrls: ['./access-point.component.css']
})
export class AccessPointComponent implements OnInit {

  isLoading = true;

  dataSource: MatTableDataSource<AccessPoint> = new MatTableDataSource();
  accesspoint: AccessPoint[] = [];
  columns: string[] = [
    // 'ItemID',
    'ItemCode',
    'BrandName',
    'ModelName',
    'IPAddress',
    'SerialNo',
    'FARCode',
    'Section',
    'Remark',
    'EnterdDate',
    'EnterdUser',
    'LastModifiedDate',
    'LastModifiedUser',
    'Actions'
  ];


  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: InventoryService, public dialog: MatDialog, private _snackBar: SnackBar) {

    this.FillAccessPointList();

   }

   FillAccessPointList()
   {
    this.service.getAccessPointList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<AccessPoint>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    );
   }

   openAccessPointDialogDialog(): void {
    let dialogRef = this.dialog.open(AccessPointDialogComponent, {
      width: '500px',
      data: { title: 'ADD Access-Point', subtitle: 'Fill the Access-Point details' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillAccessPointList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  editAccessPointDialog(ItemID: number): void {
    let dialogRef = this.dialog.open(AccessPointDialogComponent, {
      width: '500px',
      data: { title: 'EDIT ACCESS-POINT', subtitle: 'Fill the Access-Point details', ItemID : ItemID }

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillAccessPointList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

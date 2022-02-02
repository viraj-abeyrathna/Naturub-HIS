import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InventoryService } from 'src/app/api-services/inventory.service';
import { DvrDialogComponent } from './dvr-dialog';
import { SnackBar } from "../../../shared/common/snackBar";
import { DVR } from "../../../model/dvr";

@Component({
  selector: 'app-dvr',
  templateUrl: './dvr.component.html',
  styleUrls: ['./dvr.component.css']
})
export class DvrComponent implements OnInit {
  isLoading = true;

  dataSource: MatTableDataSource<DVR> = new MatTableDataSource();
  computers: DVR[] = [];
  columns: string[] = [
    'ItemID',
    'ItemCode',
    'Type',
    'SubCategory',
    'BrandName',
    'ModelName',
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

    this.FillDVRList();

  }

  FillDVRList() {
    this.service.getDVRList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<DVR>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    );
  }

  openAddDVRDialog(): void {
    let dialogRef = this.dialog.open(DvrDialogComponent, {
      width: '500px',
      data: { title: 'ADD DVR', subtitle: 'Fill the DVR details', ItemID: 0 }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillDVRList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  openEditDVRDialog(ItemID: number): void {
    let dialogRef = this.dialog.open(DvrDialogComponent, {
      width: '500px',
      data: { title: 'EDIT DVR', subtitle: 'Fill the DVR details', ItemID : ItemID }

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillDVRList();
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

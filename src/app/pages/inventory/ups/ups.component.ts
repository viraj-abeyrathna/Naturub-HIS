import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UpsDialogComponent } from './ups-dialog';
import { InventoryService } from 'src/app/api-services/inventory.service';
import { SnackBar } from "../../../shared/common/snackBar";
import { Ups } from "../../../model/ups";


@Component({
  selector: 'app-ups',
  templateUrl: './ups.component.html',
  styleUrls: ['./ups.component.css']
})
export class UpsComponent implements OnInit {

  isLoading = true;

  dataSource: MatTableDataSource<Ups> = new MatTableDataSource();
  ups: Ups[] = [];
  columns: string[] = [
    // 'ItemID',
    'ItemCode',
    'BrandName',
    'SerialNo',
    'Capacity',
    'FARCode',
    'SubCategory',
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

    this.FillUpsList();

  }

  FillUpsList() {
    this.service.getUpsList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<Ups>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    );
  }

  openAddUpsDialog(): void {
    let dialogRef = this.dialog.open(UpsDialogComponent, {
      width: '500px',
      data: { title: 'ADD UPS', subtitle: 'Fill the UPS details', ItemID : 0 }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillUpsList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  openEditComputerDialog(ItemID: number): void {
    let dialogRef = this.dialog.open(UpsDialogComponent, {
      width: '500px',
      data: { title: 'EDIT UPS', subtitle: 'Fill the UPS details', ItemID : ItemID }

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillUpsList();
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




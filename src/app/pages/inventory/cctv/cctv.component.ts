import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CctvDialogComponent } from './cctv-dialog';
import { InventoryService } from 'src/app/api-services/inventory.service';
import { SnackBar } from "../../../shared/common/snackBar";
import { CCTV } from "../../../core/model/cctv";


@Component({
  selector: 'app-cctv',
  templateUrl: './cctv.component.html',
  styleUrls: ['./cctv.component.css']
})
export class CctvComponent implements OnInit {
  
  isLoading = true;

  dataSource: MatTableDataSource<CCTV> = new MatTableDataSource();
  computers: CCTV[] = [];
  columns: string[] = [
    'ItemID',
    'ItemCode',
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

    this.FillCCTVList();

   }

   openAddCCTVDialog(): void {
    let dialogRef = this.dialog.open(CctvDialogComponent, {
      width: '500px',
      data: { title: 'ADD CCTV', subtitle: 'Fill the CCTV details', ItemID : 0 }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillCCTVList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  openEditCCTVDialog(ItemID: number): void {
    let dialogRef = this.dialog.open(CctvDialogComponent, {
      width: '500px',
      data: { title: 'EDIT CCTV', subtitle: 'Fill the CCTV details', ItemID : ItemID }

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillCCTVList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  FillCCTVList()
  {
    this.service.getCCTVList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<CCTV>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    );
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

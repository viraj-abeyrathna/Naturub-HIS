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
import { MobilePhoneDialogComponent } from './mobile-phone-dialog';
import { MobilePhone } from "../../../core/model/mobilephone";

@Component({
  selector: 'app-mobile-phone',
  templateUrl: './mobile-phone.component.html',
  styleUrls: ['./mobile-phone.component.css']
})
export class MobilePhoneComponent implements OnInit {

  isLoading = true;

  dataSource: MatTableDataSource<MobilePhone> = new MatTableDataSource();
  accesspoint: MobilePhone[] = [];
  columns: string[] = [
    // 'ItemID',
    'ItemCode',
    'BrandName',
    'ModelName',
    'IMEINumber1',
    'IMEINumber2',
    'AuthorizedUser',
    'IssueDate',
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

    this.FillMobilePhoneList();

   }

   FillMobilePhoneList()
   {
    this.service.getMobilePhoneList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<MobilePhone>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    );
   }

   openEthernetSwitchDialogDialog(): void {
    let dialogRef = this.dialog.open(MobilePhoneDialogComponent, {
      width: '500px',
      data: { title: 'ADD Mobile Phone', subtitle: 'Fill the Mobile Phone details', ItemID : 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillMobilePhoneList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  editEthernetSwitchDialog(ItemID: number): void {
    let dialogRef = this.dialog.open(MobilePhoneDialogComponent, {
      width: '500px',
      data: { title: 'EDIT Mobile Phone', subtitle: 'Fill the Mobile Phone details', ItemID : ItemID }

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillMobilePhoneList();
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

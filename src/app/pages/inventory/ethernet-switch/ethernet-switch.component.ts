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
import { EthernetSwitchDialogComponent } from './ethernet-switch-dialog';
import { EthernetSwitch } from "../../../model/ethernetswitch";

@Component({
  selector: 'app-ethernet-switch',
  templateUrl: './ethernet-switch.component.html',
  styleUrls: ['./ethernet-switch.component.css']
})
export class EthernetSwitchComponent implements OnInit {

  isLoading = true;

  dataSource: MatTableDataSource<EthernetSwitch> = new MatTableDataSource();
  accesspoint: EthernetSwitch[] = [];
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

    this.FillEthernetSwitchList();

   }

   FillEthernetSwitchList()
   {
    this.service.getEthernetSwitchList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<EthernetSwitch>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    );
   }

   openEthernetSwitchDialogDialog(): void {
    let dialogRef = this.dialog.open(EthernetSwitchDialogComponent, {
      width: '500px',
      data: { title: 'ADD Ethernet-Switch', subtitle: 'Fill the Ethernet-Switch details', ItemID : 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillEthernetSwitchList();
        } else if (result.SavedSuccess === false) {
          this._snackBar.errorSnackBar('Data saving error !', 4000)
        }
      }
    });
  }

  editEthernetSwitchDialog(ItemID: number): void {
    let dialogRef = this.dialog.open(EthernetSwitchDialogComponent, {
      width: '500px',
      data: { title: 'EDIT Ethernet-Switch', subtitle: 'Fill the Ethernet-Switch details', ItemID : ItemID }

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.SavedSuccess === true) {
          this._snackBar.successSnackBar('(' + result.ItemCode + ')  is successfully saved !', 4000)
          this.FillEthernetSwitchList();
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

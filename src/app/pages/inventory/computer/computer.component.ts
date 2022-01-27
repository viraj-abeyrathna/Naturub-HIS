import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ComputerDialogComponent } from './computer-dialog';
import { InventoryService } from 'src/app/api-services/inventory.service';
import { Computer } from "../../../model/computer";

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

  dataSource: MatTableDataSource<Computer> = new MatTableDataSource();
  computers: Computer[] = [];
  columns: string[] = [
    'ItemID', 
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
    'Remark',
    'EnterdDate',
    'EnterdUser',
    'LastModifiedDate',
    'LastModifiedUser',
    'Actions'
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: InventoryService, public dialog: MatDialog) {

    this.service.getComputerList(0).subscribe(
        (data: any) => {
          this.dataSource = new MatTableDataSource<Computer>(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          return data;
        }
    );
  }

  openAddComputerDialog(): void {
    let dialogRef = this.dialog.open(ComputerDialogComponent, {
      width: '500px',
      data: {title: 'ADD COMPUTER', subtitle:'Fill the computer details'}
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openEditComputerDialog(): void {
    let dialogRef = this.dialog.open(ComputerDialogComponent, {
      width: '500px',
      data: {title: 'Edit Computer', subtitle:'Change the computer details'}
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit(): void {
    this.FillComputers();
  }

  FillComputers() {
    this.dataSource = new MatTableDataSource(this.computers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

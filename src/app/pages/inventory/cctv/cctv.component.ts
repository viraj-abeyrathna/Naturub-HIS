import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { InventoryService } from 'src/app/api-services/inventory.service';

export interface CCTV {
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
  selector: 'app-cctv',
  templateUrl: './cctv.component.html',
  styleUrls: ['./cctv.component.css']
})
export class CctvComponent implements OnInit {
  
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


  constructor(private service: InventoryService, public dialog: MatDialog) {
    this.myControl = new FormControl();

    this.service.getCCTVList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<CCTV>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return data;
      }
    );

   }

   myControl = new FormControl();
   options: string[] = ['One', 'Two', 'Three'];
   filteredOptions!: Observable<string[]>;

   ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

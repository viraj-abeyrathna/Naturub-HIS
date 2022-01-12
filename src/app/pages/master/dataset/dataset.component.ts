import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { DataSetService } from "../../../api-services/dataset.service";


export interface Dataset {
  DataSetID: string;
  DataSetName: string;
} 

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit { 

  dataSource: MatTableDataSource<Dataset> = new MatTableDataSource();
  datasets: Dataset[] = []; 
  columns: string[] = ['DataSetID', 'DataSetName','Actions'];

  @ViewChild(MatSort, { static: false })sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private service: DataSetService) {

    this.service.getDataSetList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<Dataset>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return data;
      }
    ); 

  }

  ngOnInit(): void {

    this.FillDataSets(); 
  }

  FillDataSets(){
    this.dataSource = new MatTableDataSource(this.datasets);
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

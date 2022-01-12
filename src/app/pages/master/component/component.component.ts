import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


import { ComponentService } from "../../../api-services/component.service";



export interface Components {
  ComponentID: number;
  ComponentName: string;
  ComponentTypeID: number;
  ComponentTypeName: string;
  MinLength?: number;
  MaxLength?: number;
  DataSetID?: number;
  DataSetName?: string

}

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {


  dataSource: MatTableDataSource<Components> = new MatTableDataSource();
  components: Components[] = [];
  columns: string[] = ['ComponentID', 'ComponentName', 'ComponentTypeName','Actions'];

  @ViewChild(MatSort, { static: false })sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private service: ComponentService) {

    this.service.getGetComponentList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<Components>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        return data;
      }
    ); 
  }

  ngOnInit(): void {
    this.FillComponents();
  }

  FillComponents() {
    this.dataSource = new MatTableDataSource(this.components);
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}

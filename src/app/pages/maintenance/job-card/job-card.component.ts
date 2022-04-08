import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { JobCard } from "../../../core/model/jobcard";
import { SnackBar } from "../../../shared/common/snackBar";
import { MaintenanceService } from 'src/app/api-services/maintenance.service';
import { AuthService } from 'src/app/core'; 

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

  isLoading = true;

  dataSource: MatTableDataSource<JobCard> = new MatTableDataSource();
  jobcard: JobCard[] = [];
  columns: string[] = [
    'JobCardNo',
    'ItemCode',
    'ItemDesc',
    'MaintenanceType',
    'MaintenancePart',
    'MainCategory',
    'SubCategory',
    'Remark',
    'EnterdDate',
    'EnterdUser',
    'Actions'
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private service: MaintenanceService, public dialog: MatDialog, private _snackBar: SnackBar, public authService:AuthService) {

    this.FillJobCardList();

  }

  ngOnInit(): void {
  }

  FillJobCardList() {
    this.service.getJobCardList(0).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource<JobCard>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        // return data;
      }
    );
  }

  JobCardDelete(ID: number) {
    if(confirm("Are you sure to delete? ")) {
      const objJobCard = new JobCard();
      objJobCard.JobCardID = ID;
      objJobCard.EnterdUserID = this.authService.userData.userID;
      // console.log(this.authService.userData.userID);
      this.service.deleteJobCard(objJobCard).subscribe(data => {
        if (data) {
          this.FillJobCardList();
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maintenance } from '../core/model/maintenance';
import { JobCard } from '../core/model/jobcard';
import { CommonData } from '../shared/common/common';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  saveJobCard(obj:Maintenance):Observable<{}>{ 
    return this.http.post(new CommonData().APIUrl + '/Maintenance/SaveJobCard/',obj);
  }

  getJobCardList(val: any) {
    return this.http.get<JobCard[]>(new CommonData().APIUrl + '/Maintenance/GetJobCard/' + val);
  }

  deleteJobCard(obj:JobCard):Observable<{}>{
    return this.http.post(new CommonData().APIUrl + '/Maintenance/DeleteJobCard/',obj);
  }

}

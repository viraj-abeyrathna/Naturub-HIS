import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maintenance } from '../core/model/maintenance';
import { CommonData } from '../shared/common/common';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  saveJobCard(obj:Maintenance):Observable<{}>{ 
    return this.http.post(new CommonData().APIUrl + '/Maintenance/SaveJobCard/',obj);
  }
}

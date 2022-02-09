import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CommonData } from "../shared/common/common";

import { Components } from '../pages/master/component/component.component';
import { Dataset } from '../pages/master/dataset/dataset.component';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  // Component
  getGetComponentList(val: number): Observable<any> {
    return this.http.get<Components[]>(new CommonData().APIUrl + '/Master/GetComponent/' + val);
  }

  // Data Set
  getDataSetList(val: any) {
    return this.http.get<Dataset[]>(new CommonData().APIUrl + '/Master/GetDataSet/' + val);
  }

  // Main Category
  getMainCategory(): Observable<any[]> {
    return this.http.get<any>(new CommonData().APIUrl + '/Master/GetMainCategory');
  }

  // Sub Category
  getSubCategory(val: any) {
    return this.http.get<any>(new CommonData().APIUrl + '/Master/GetSubCategory/' + val);
  }

  // Department
  getDepartment(): Observable<any[]> {
    return this.http.get<any>(new CommonData().APIUrl + '/Master/GetDepartment');
  }

  // Section
  getSection(val: any): Observable<any[]> {
    return this.http.get<any>(new CommonData().APIUrl + '/Master/GetSection/' + val);
  }

  // Brand
  getBrand(val: any) {
    return this.http.get<any>(new CommonData().APIUrl + '/Master/GetBrand/' + val);
  }

  // Maintenance Type
  getMaintenanceType() {
    return this.http.get<any>(new CommonData().APIUrl + '/Master/GetMaintenanceType/');
  }

  // Maintenance Part
  getMaintenancePart(_subCategoryID:number){
    return this.http.get<any>(new CommonData().APIUrl + '/Master/GetMaintenancePart/'+_subCategoryID);
  }



}

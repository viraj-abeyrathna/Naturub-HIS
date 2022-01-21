import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators'; 
import { CommonData } from "../shared/common/common";
import { Dataset } from '../pages/master/dataset/dataset.component';

@Injectable({
  providedIn: 'root'
})
export class DataSetService { 
  
  constructor(private http:HttpClient) { }
 

  getDataSetList(val:any)
  {
    return this.http.get<Dataset[]>(new CommonData().APIUrl+'/Master/GetDataSet/'+val); 
  }


  addDepartment(val:any){
    return this.http.post(new CommonData().APIUrl+'/Department',val);
  }

  updateDepartment(val:any){
    return this.http.put(new CommonData().APIUrl+'/Department',val);
  }

  deleteDepartment(val:any){
    return this.http.delete(new CommonData().APIUrl+'/Department/'+val);
  }


  getEmpList():Observable<any[]>{
    return this.http.get<any>(new CommonData().APIUrl+'/Employee');
  }

  addEmployee(val:any){
    return this.http.post(new CommonData().APIUrl+'/Employee',val);
  }

  updateEmployee(val:any){
    return this.http.put(new CommonData().APIUrl+'/Employee',val);
  }

  deleteEmployee(val:any){
    return this.http.delete(new CommonData().APIUrl+'/Employee/'+val);
  }


  UploadPhoto(val:any){
    return this.http.post(new CommonData().APIUrl+'/Employee/SaveFile',val);
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(new CommonData().APIUrl+'/Employee/GetAllDepartmentNames');
  }

  opts = [];

  getCmbAllDistrict() {
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(new CommonData().APIUrl+'/district/GetAllDistrict').pipe(tap(data => this.opts = data))
  }

  getcmbDistrictWiseCity(val:any)
  {
    return this.http.get<any[]>(new CommonData().APIUrl+'/district/GetcmbDistrictWiseCity/'+val);
    // return this.http.get<StateVM[]>(this.Url + '/StateData?CountryId='+CountryId);
    // return this.opts.length ?
    // of(this.opts) :
    // this.http.get<any>(this.APIUrl+'/district/GetcmbDistrictWiseCity',val).pipe(tap(data => this.opts = data))

  }

  // getCmbAllDistrict():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/district/GetAllDistrict');
  // }

}

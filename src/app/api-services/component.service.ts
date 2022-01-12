import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators'; 
import { CommonData } from "../shared/common/common";
import { Components } from '../pages/master/component/component.component';

@Injectable({
  providedIn: 'root'
})
export class ComponentService { 
  
  constructor(private http:HttpClient) { }
 

  getGetComponentList(val:number): Observable<any>
  {
    return this.http.get<Components[]>(new CommonData().APIUrl+'/Master/GetComponent/'+val);  
  }
 

}

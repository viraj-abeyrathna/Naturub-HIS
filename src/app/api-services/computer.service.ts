import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CommonData } from "../shared/common/common";
import { Computers } from '../pages/inventory/computer/computer.component';

@Injectable({
    providedIn: 'root'
  })

  export class ComputerService { 
    constructor(private http:HttpClient) { }

    getComputerList(val:any)
    {
      return this.http.get<Computers[]>(new CommonData().APIUrl+'/Inventory/GetComputer/'+val); 
    }

  }
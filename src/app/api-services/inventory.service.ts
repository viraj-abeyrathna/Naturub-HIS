import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CommonData } from "../shared/common/common";
import { Computers } from '../pages/inventory/computer/computer.component';
import { Computer } from "../model/computer";

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  constructor(private http: HttpClient) { }

  // Computer
  getComputerList(val: any) {
    return this.http.get<Computers[]>(new CommonData().APIUrl + '/Inventory/GetComputer/' + val);
  }

  getComputerModels() {
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetComputerModels');
  }

  getOperatingSystem(){
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetOperatingSystem');
  }

  getVirusGuard(){
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetVirusGuard');
  }

  getProcessor(){
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetProcessor');
  }

  getRAM(){
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetRAM');
  }

  saveComputer(obj:Computer):Observable<{}>{
    
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // // const queryParams = [val._selection].map((row: { value: any; }) => `id=${row.value}`);
    // const url = new CommonData().APIUrl + '/Inventory/SaveComputer';

    // const options = {
    //   obj:val2,
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     }),
    //     body: {
    //       val2
    //     }
    // } 

    //// return this.http.post<any>(url, options);

    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // }

    console.log(obj);

 
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveComputer',obj);
  }



}
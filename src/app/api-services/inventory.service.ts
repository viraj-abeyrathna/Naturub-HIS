import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { CommonData } from "../shared/common/common"; 
import { Computer } from "../core/model/computer";
import { Ups } from '../core/model/ups';
import { AccessPoint } from '../core/model/accesspoint';
import { CCTV } from '../core/model/cctv';
import { DVR } from '../core/model/dvr';
import { EthernetSwitch } from '../core/model/ethernetswitch';
import { MobilePhone } from '../core/model/mobilephone'; 


@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) { }

  // Computer
  getComputerList(val: any) {
    return this.http.get<Computer[]>(new CommonData().APIUrl + '/Inventory/GetComputer/' + val);
  }

  // getHomeDetails(): Observable<{}> {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let authToken = localStorage.getItem('auth_token');
  //   headers.append('Authorization', `Bearer ${authToken}`);
  
  //   return this.http.get<Computer[]>(new CommonData().APIUrl+ "/dashboard/home",{headers})
  //   .map((response: { json: () => any; }) => response.json()); 
  // }

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

  getIPAddress(ipAddress: string) {
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetIPAddress/' + ipAddress); 
  }

  saveComputer(obj:Computer):Observable<{}>{  
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveComputer',obj);
  }

  updateComputer(obj:Computer):Observable<{}>{
    return this.http.post(new CommonData().APIUrl + '/Inventory/UpdateComputer',obj);
  }

  // Ups
  getUpsList(val: any):Observable<{}> {
    return this.http.get<Ups[]>(new CommonData().APIUrl + '/Inventory/GetUps/' + val);
  }

  getCapacity(){
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetCapacity');
  }

  saveUps(obj:Ups):Observable<{}>{ 
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveUps',obj);
  }

  updateUps(obj:Ups):Observable<{}>{ 
    return this.http.post(new CommonData().APIUrl + '/Inventory/UpdateUps',obj);
  }

  //AccessPoint
  getAccessPointList(val: any) {
    return this.http.get<AccessPoint[]>(new CommonData().APIUrl + '/Inventory/GetAccessPoint/' + val);
  }

  saveAccessPoint(obj:AccessPoint):Observable<{}>{ 
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveAccessPoint',obj);
  }

  updateAccessPoint(obj:AccessPoint):Observable<{}>{ 
    return this.http.post(new CommonData().APIUrl + '/Inventory/UpdateAccessPoint',obj);
  }

  //CCTV
  getCCTVList(val: any) {
    return this.http.get<CCTV[]>(new CommonData().APIUrl + '/Inventory/GetCCTV/' + val);
  }

  

  getCctvModels(){
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetCctvModels');
  }

  saveCctv(obj:CCTV):Observable<{}>{
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveCctv',obj);
  }

  updateCctv(obj:CCTV):Observable<{}>{
    return this.http.post(new CommonData().APIUrl + '/Inventory/UpdateCctv',obj);
  }


  //DVR
  getDVRList(val: any) {
    return this.http.get<DVR[]>(new CommonData().APIUrl + '/Inventory/GetDVR/' + val);
  }

  getDvrType()
  {
    return this.http.get<string[]>(new CommonData().APIUrl + '/Inventory/GetDvrType');
  }

  saveDvr(obj:DVR):Observable<{}>{
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveDvr',obj);
  }

    //Ethernet-Switch
  getEthernetSwitchList(val: any) {
    return this.http.get<EthernetSwitch[]>(new CommonData().APIUrl + '/Inventory/GetEthernetSwitch/' + val);
  }

  saveEthernetSwitch(obj:EthernetSwitch):Observable<{}>{
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveEthernetSwitch',obj);
  }

   //Mobile-Phone
   saveMobilePhone(obj:MobilePhone):Observable<{}>{
    return this.http.post(new CommonData().APIUrl + '/Inventory/SaveMobilePhone',obj);
  }

  getMobilePhoneList(val: any) {
    return this.http.get<MobilePhone[]>(new CommonData().APIUrl + '/Inventory/GetMobilePhone/' + val);
  }

  Test(){
    return this.http.get<string[]>(new CommonData().APIUrl + '/values');
  }


}
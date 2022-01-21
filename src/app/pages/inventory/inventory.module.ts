import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from "./inventory-routing.module";
import { CommonData } from "../../shared/common/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { InventoryComponent } from './inventory.component';
import { ComputerComponent } from './computer/computer.component';
import { MonitorComponent } from './monitor/monitor.component';
import { UpsComponent } from './ups/ups.component';
import { PrinterComponent } from './printer/printer.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ProjectorComponent } from './projector/projector.component';
import { CctvComponent } from './cctv/cctv.component';
import { DvrComponent } from './dvr/dvr.component';
import { RouterDongleComponent } from './router-dongle/router-dongle.component';
import { EthernetSwitchComponent } from './ethernet-switch/ethernet-switch.component';
import { AccessPointComponent } from './access-point/access-point.component';
import { MobilePhoneComponent } from './mobile-phone/mobile-phone.component';


@NgModule({
  declarations: [
    InventoryComponent,
    ComputerComponent,
    MonitorComponent,
    UpsComponent,
    PrinterComponent,
    ScannerComponent,
    ProjectorComponent,
    CctvComponent,
    DvrComponent,
    RouterDongleComponent,
    EthernetSwitchComponent,
    AccessPointComponent,
    MobilePhoneComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    CommonData,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InventoryComponent } from "./inventory.component";
import { AccessPointComponent } from "./access-point/access-point.component";
import { CctvComponent } from "./cctv/cctv.component";
import { ComputerComponent } from "./computer/computer.component";
import { DvrComponent } from "./dvr/dvr.component";
import { EthernetSwitchComponent } from "./ethernet-switch/ethernet-switch.component";
import { MobilePhoneComponent } from "./mobile-phone/mobile-phone.component";
import { MonitorComponent } from "./monitor/monitor.component";
import { PrinterComponent } from "./printer/printer.component";
import { ProjectorComponent } from "./projector/projector.component";
import { RouterDongleComponent } from "./router-dongle/router-dongle.component";
import { ScannerComponent } from "./scanner/scanner.component";
import { UpsComponent } from "./ups/ups.component";


const routes:Routes=[
    {
        path:'inventory',
        component:InventoryComponent,
        children:[
            {
                path:'accesspoint',
                component: AccessPointComponent
            },
            {
                path:'cctv',
                component: CctvComponent
            },
            {
                path:'computer',
                component: ComputerComponent
            },
            {
                path:'dvr',
                component: DvrComponent
            },
            {
                path:'ethernetswitch',
                component: EthernetSwitchComponent
            },
            {
                path:'mobilephone',
                component: MobilePhoneComponent
            },
            {
                path:'monitor',
                component: MonitorComponent
            },
            {
                path:'printer',
                component: PrinterComponent
            },
            {
                path:'projector',
                component: ProjectorComponent
            },
            {
                path:'routerdongle',
                component: RouterDongleComponent
            },
            {
                path:'scanner',
                component: ScannerComponent
            },
            {
                path:'ups',
                component: UpsComponent
            }
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class InventoryRoutingModule{}
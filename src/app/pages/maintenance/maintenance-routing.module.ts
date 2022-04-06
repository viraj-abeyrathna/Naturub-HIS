import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MaintenanceComponent } from "./maintenance.component";
import { JobCardComponent } from "../maintenance/job-card/job-card.component";


const routes:Routes=[
    {
        path:'maintenance',
        component:MaintenanceComponent,
        children:[
            {
                path:'jobcard',
                component: JobCardComponent
            }
    
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MaintenanceRoutingModule{}
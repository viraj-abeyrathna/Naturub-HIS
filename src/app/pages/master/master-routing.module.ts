import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MasterComponent } from "./master.component";
import { DatasetComponent } from "./dataset/dataset.component";
import { ComponentComponent } from "./component/component.component";

const routes:Routes=[
    {
        path:'master',
        component:MasterComponent,
        children:[
            {
                path:'dataset',
                component: DatasetComponent
            },
            {
                path:'component',
                component: ComponentComponent
            }
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MasterRoutingModule{}
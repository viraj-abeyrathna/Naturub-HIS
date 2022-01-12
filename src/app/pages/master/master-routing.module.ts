import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MasterComponent } from "./master.component";
import { DatasetComponent } from "./dataset/dataset.component";
import { ComponentComponent } from "./component/component.component";
import { FormsComponent } from "./forms/forms.component";


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
            },
            {
                path:'forms',
                component: FormsComponent
            }
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MasterRoutingModule{}
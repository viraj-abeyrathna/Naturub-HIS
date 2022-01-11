import { NgModule } from "@angular/core";

import { MenuItems } from "./menu-items/menu-items";
import { CommonData } from "./common/common";

@NgModule({
    declarations: [],
    exports: [],
    providers: [MenuItems],
    imports: [CommonData]
})
export class SharedModule{}
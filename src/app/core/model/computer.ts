export class Computer {
    ItemID: number | undefined;
    ItemCode: string | undefined;
    ComputerName: string | undefined;
    IPAddress: string | undefined; 
    MainCategoryID: number | undefined;
    SubCategoryID: number | undefined;
    SubCategory: string | undefined;
    DepartmentID:string|undefined;
    Department:string|undefined;
    SectionID: number | undefined;
    Section: string | undefined;
    FARBarcodeNo: string | undefined; 
    LoginUser: string | undefined;
    AuthorizedUser: string | undefined;
    ModelName: string | undefined;
    OperatingSystemID: number | undefined;
    OperatingSystem: string | undefined;
    IsVirusGuardActive: boolean | undefined;
    VirusGuard: string | undefined;
    ProcessorID: number | undefined;
    Processor: string | undefined;
    RAMID: number | undefined;
    RAM: string | undefined;
    Capacity: string | undefined;
    Remark?: string | undefined;  
    EnterdDate: Date | undefined;
    EnterdUser: string | undefined;
    EnterdUserID: number | undefined;
    LastModifiedDate?: Date;
    LastModifiedUser?: string; 
    SerialNo?: string; 
    LastModifiedUserID?: number;  

    IsUpgrade:boolean | undefined; // Upgrade Mode
}




 
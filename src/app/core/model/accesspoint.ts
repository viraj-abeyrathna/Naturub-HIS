export class AccessPoint {
    MainCategoryID : number | undefined;
    ItemID: number | undefined;
    ItemCode: string | undefined;
    SubCategoryID: number | undefined;
    SubCategory: string | undefined;
    DepartmentID:string|undefined;
    Department:string|undefined;
    SectionID: number | undefined;
    Section: string | undefined;
    BrandID: number | undefined;
    BrandName: string | undefined;
    IPAddress: string | undefined; 
    SerialNo : string | undefined;
    FARBarcodeNo: string | undefined; 
    ModelName: string | undefined;
    Remark?: string | undefined;  
    EnterdDate: Date | undefined;
    EnterdUser: string | undefined;
    EnterdUserID: number | undefined;
    LastModifiedDate?: Date;
    LastModifiedUser?: string; 
    LastModifiedUserID?: string; 
}
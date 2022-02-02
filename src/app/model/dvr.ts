export class DVR {
    ItemID: number | undefined;
    ItemCode: string | undefined;
    MainCategoryID: number | undefined;
    TypeID: number | undefined;
    Type: string | undefined;
    SubCategoryID: number | undefined;
    SubCategory: string | undefined;
    DepartmentID:string|undefined;
    Department:string|undefined;
    SectionID: number | undefined;
    Section: string | undefined;
    BrandID: number | undefined;
    BrandName: string | undefined;
    ModelName: string | undefined;
    SerialNo : string | undefined;
    FARBarcodeNo: string | undefined; 
    Remark?: string | undefined;  
    EnterdDate: Date | undefined;
    EnterdUser: string | undefined;
    EnterdUserID: number | undefined;
    LastModifiedDate?: Date;
    LastModifiedUser?: string; 
    LastModifiedUserID?: string; 
}
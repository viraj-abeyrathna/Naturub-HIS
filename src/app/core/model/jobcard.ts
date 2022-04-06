export class JobCard { 
    JobCardID: number | undefined; 
    JobCardNo:string|undefined; 
    ItemCode:string|undefined; 
    ItemDesc:string|undefined; 
    MaintenanceType:string|undefined; 
    MaintenancePart:string|undefined; 
    MainCategory:string|undefined; 
    SubCategory:string|undefined; 
    Remark?: string | undefined;   
    EnterdUser:string | undefined;
    EnterdDate:Date | undefined;
}
import { Component, OnInit } from '@angular/core'; 
import { DataSetService } from "../../../api-services/dataset.service";


export interface Dataset {
  DataSetID: string;
  DataSetName: string;
} 

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit { 

  datasets: Dataset[] = []; 

  constructor(private service: DataSetService) { }

  ngOnInit(): void {

    this.FillDataSets(); 
  }

  FillDataSets(){
    this.service.getDataSetList(0).subscribe(data=>{this.datasets = data});
  }

}

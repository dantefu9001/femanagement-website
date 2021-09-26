import {Component, OnInit, ViewChild} from '@angular/core';
import {EquipmentsSummary} from "../../model/model";
import {EquipmentService} from "../../service/equipment.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-equipments-summary',
  templateUrl: './equipments-summary.component.html',
  styleUrls: ['./equipments-summary.component.scss']
})
export class EquipmentsSummaryComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<Data> = [];
  setOfCheckedId = new Set<number>();
  summaryList!: Array<EquipmentsSummary>
  selectedSummary!:EquipmentsSummary;
  summary!: string;
  summaryType = 'weekly';
  scrollJson = {
    y: "320px"
  };

  //modal param
  isVisible = false;
  isOkLoading = false;
  editForm!: FormGroup;
  updatedSummaryString!: string;


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Data>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({disabled}) => !disabled);
    this.checked =listOfEnabledData.length>0 && listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({disabled}) => !disabled).forEach(({id}) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  constructor(private fb:FormBuilder,
              public nzMsgService:NzMessageService,
              public equipmentService: EquipmentService){
  }

  ngOnInit(): void {
    this.getEquipmentSummary();
    this.editForm = this.fb.group({
      summary: new FormControl()
    })
  }

  search(type: string): void {
    this.summaryType = type;
    this.setOfCheckedId.clear();
    this.getEquipmentSummary();
  }

  edit() {
    if (this.setOfCheckedId.size !== 1) {
      this.nzMsgService.error("请选择单个小结进行编辑");
    } else {
      this.selectedSummary = this.summaryList.filter(summary=>this.setOfCheckedId.has(summary.id)).pop()!;
      this.showModal();
    }
  }

  getEquipmentSummary(): void {
    const api = this.equipmentService.api+'/equipments-summary';
    this.loading = true;
    let param = {
      type: this.summaryType,
      summary: this.summary
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.summaryList = result.data;
      this.loading = false;
      this.setOfCheckedId.clear();
    });
  }

  updateEquipmentSummary(): void {
    const api =this.equipmentService.api+'/equipments-summary/update';
    this.isOkLoading = true;
    let param = {
      id: this.selectedSummary?.id,
      summary: this.editForm.get("summary")?.value
    }
    this.equipmentService.postData(api, param).then(() => {
      this.isOkLoading = false;
      this.isVisible = false;
      this.editForm.reset();
      this.getEquipmentSummary();
    });
  }

  delete(): void {
    const api = this.equipmentService.api+'/equipments-summary/delete';
    let params = {
      "ids": Array.from(this.setOfCheckedId),
    }
    this.equipmentService.postData(api, params).then(() => {
      this.getEquipmentSummary();
    })
  }

  showModal(): void {
    this.updatedSummaryString = this.selectedSummary?.summary;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.updateEquipmentSummary()
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

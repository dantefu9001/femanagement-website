import {Component, ViewChild} from '@angular/core';
import {EquipmentsMaintenanceSheet, MaintenanceStatus} from "../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentService} from "../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {ResponseRatingComponent} from "./ratings/response-rating/response-rating.component";
import {OverallRatingComponent} from "./ratings/overall-rating/overall-rating.component";
import {FiveSRatingComponent} from "./ratings/five-s-rating/five-s-rating.component";
import {QualityRatingComponent} from "./ratings/quality-rating/quality-rating.component";

@Component({
  selector: 'app-equipment-maintenance-validate-judgement',
  templateUrl: './equipment-maintenance-validate-judgement.component.html',
  styleUrls: ['./equipment-maintenance-validate-judgement.component.scss']
})
export class EquipmentMaintenanceValidateJudgementComponent {
  @ViewChild('responseRatingComponent') responseRating: ResponseRatingComponent;
  @ViewChild('overallRatingComponent') overallRating: OverallRatingComponent;
  @ViewChild('fiveSRatingComponent') fiveSRating: FiveSRatingComponent;
  @ViewChild('qualityRatingComponent') qualityRating: QualityRatingComponent;
  listOfSelection: Array<EquipmentsMaintenanceSheet> = [];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  listOfData: ReadonlyArray<EquipmentsMaintenanceSheet> = [];
  setOfCheckedId = new Set<number>();
  searchForm!: FormGroup;
  isConfirmVisible: boolean = false;
  isConfirmOkLoading: boolean = false;
  isJudgementVisible: boolean = false;
  isJudgementOkLoading: boolean = false;
  judgeForm!: FormGroup;
  anonymous: boolean = false;


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.listOfSelection = [...this.listOfData.filter(d => d.id == id)]
    } else {
      this.setOfCheckedId.delete(id);
      this.listOfSelection = this.listOfSelection.filter(d => d.id !== id)
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: ReadonlyArray<EquipmentsMaintenanceSheet>): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.length > 0 && this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  constructor(
    public overallRatingComponent: OverallRatingComponent,
    public fiveSRatingComponent: FiveSRatingComponent,
    public qualityRatingComponent: QualityRatingComponent,
    public responseRatingComponent: ResponseRatingComponent,
    public fb: FormBuilder,
    public equipmentService: EquipmentService,
    public nzMsgService: NzMessageService) {
    this.overallRating = overallRatingComponent;
    this.fiveSRating = fiveSRatingComponent;
    this.qualityRating = qualityRatingComponent;
    this.responseRating = responseRatingComponent;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      "equipmentGroup": new FormControl(''),
      "equipment": new FormControl(''),
      "startDate": [null],
      "endDate": [null],
      "status": new FormControl('')
    });
    this.judgeForm = this.fb.group({
      "code": '',
      "response": '',
      "quality": '',
      "fiveS": '',
      "overall": '',
      "remark": '',
      "submitAnonymously": ''
    })
    this.search();
  }

  search() {
    const api = this.equipmentService.api + '/maintenance/submitter';
    let param = {
      startDate: this.searchForm.get('startDate')?.value,
      endDate: this.searchForm.get('endDate')?.value,
      equipment: this.searchForm.get('equipment')?.value,
      equipmentGroup: this.searchForm.get('equipmentGroup')?.value,
      status:MaintenanceStatus.MAINTAINED+","+MaintenanceStatus.RATED
    };
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.listOfData = result.data
    });
  }

  view() {

  }


  resetAndSearch() {
    this.searchForm.setControl('equipment', new FormControl(''));
    this.searchForm.setControl('equipmentGroup', new FormControl(''))
    this.search();
  }

  confirm() {
    if (this.listOfSelection.length !== 1) {
      this.nzMsgService.error("请选择一条数据")
    } else {
      this.isConfirmVisible = true;
    }
  }

  judge() {
    if (this.listOfSelection.length !== 1) {
      this.nzMsgService.error("请选择一条数据")
    } else {
      this.isJudgementVisible = true;
    }
  }


  handleConfirmOk() {
    //update rating numbers
    this.isConfirmOkLoading = true;
    this.confirmData();
  }

  handleJudgementOk() {
    //update status to confirm
    this.isJudgementOkLoading = true;
    this.rate();
  }


  handleConfirmCancel() {
    this.isConfirmVisible = false;
    this.isJudgementVisible = true;
  }

  handleJudgementCancel() {
    this.isJudgementVisible = false;
  }


  confirmData() {
    const api = this.equipmentService.api + '/maintenance/submitter/confirm';
    let param = {
      id: this.listOfSelection[0]?.id,
      status: MaintenanceStatus.CONFIRMED
    }
    this.equipmentService.postData(api, param).then((result: any) => {
      this.listOfData = result.data
      this.isConfirmVisible = false;
      this.isConfirmOkLoading = false;
    });
  }

  rate() {
    const api = this.equipmentService.api + '/maintenance/submitter/rate';
    let param = {
      id: this.listOfSelection[0]?.id,
      responseRating: this.responseRating.response,
      qualityRating: this.qualityRating.quality,
      fiveSRating: this.fiveSRating.fiveS,
      overallRating: this.overallRating.overall,
      status:MaintenanceStatus.RATED,
      description: this.judgeForm.get('remark')?.value,
      anonymous: this.anonymous
    };
    this.equipmentService.postData(api, param).then(() => {
      this.isJudgementVisible = false;
      this.isJudgementOkLoading = false;
      this.resetAndSearch();
    });
  }
}

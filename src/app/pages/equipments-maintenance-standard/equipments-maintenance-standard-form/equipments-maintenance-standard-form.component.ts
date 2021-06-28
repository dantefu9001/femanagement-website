import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MalfunctionLevel, MalfunctionType} from "../../basicdata/basic-data-configs/basic-data-configs.component";
import {
  Equipment,
  EquipmentsMaintenanceSheet,
  Group,
  Person,
  Process,
  ProductionLine,
  SparePart
} from "../../../model/model";
import {ResponseRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/response-rating/response-rating.component";
import {OverallRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/overall-rating/overall-rating.component";
import {FiveSRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/five-s-rating/five-s-rating.component";
import {QualityRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/quality-rating/quality-rating.component";
import {EquipmentService} from "../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-equipments-maintenance-standard-form',
  templateUrl: './equipments-maintenance-standard-form.component.html',

  styleUrls: ['./equipments-maintenance-standard-form.component.scss']
})
export class EquipmentsMaintenanceStandardFormComponent implements OnInit {
  @Input() selectedMaintenanceSheet!: EquipmentsMaintenanceSheet;
  @ViewChild('responseRatingComponent') responseRating: ResponseRatingComponent;
  @ViewChild('overallRatingComponent') overallRating: OverallRatingComponent;
  @ViewChild('fiveSRatingComponent') fiveSRating: FiveSRatingComponent;
  @ViewChild('qualityRatingComponent') qualityRating: QualityRatingComponent;

  validateForm: FormGroup;
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  malfunctionTypes!: Array<MalfunctionType>;
  malfunctionType!: MalfunctionType;
  reporter!: Person;
  maintainer!: Person;
  personnel!: Array<Person>;
  editable: boolean = true;
  selectedProductionLine!: ProductionLine;
  productionLines!: Array<ProductionLine>;
  selectedProcess!: Process;
  process!: Array<Process>;
  selectedEquipment!: Equipment;
  equipments!: Array<Equipment>;
  reportDate!: Date;
  groups!: Array<Group>;
  selectedGroup!: Group;
  dispatchDate!: Date;
  dispatcher!: Person;
  deadline!: Date;
  malfunctionLevels!: Array<MalfunctionLevel>;
  malfunctionLevel!: MalfunctionLevel;
  finishDate!: Date;
  validator!: Person;
  validateDate!: Date;
  checker!: Person;
  checkDate!: Date;
  scrollJson = {
    y: "280px"
  };
  listOfData!: Array<SparePart>;
  ratePerson!: Person;
  rateDate!: Date;


  constructor(private fb: FormBuilder,
              public nzMsgService: NzMessageService,
              public equipmentService: EquipmentService,
              public overallRatingComponent: OverallRatingComponent,
              public fiveSRatingComponent: FiveSRatingComponent,
              public qualityRatingComponent: QualityRatingComponent,
              public responseRatingComponent: ResponseRatingComponent,) {
    this.overallRating = overallRatingComponent;
    this.fiveSRating = fiveSRatingComponent;
    this.qualityRating = qualityRatingComponent;
    this.responseRating = responseRatingComponent;
    this.validateForm = this.fb.group({
      code: '',
      dateOfReport: '',
      description: '',
      dateOfDispatch: '',
      dispatchInfo: '',
      dateOfDeadline: '',
      malfunctionDesc: '',
      pauseTime: '',
      dateOfFinish: '',
      dateOfCheck: '',
      maintenanceDesc: '',
      precautions: '',
      dateOfValidation: '',
      validateDesc: '',
      validateJudgement: '',
      dateOfRate: '',
      feedbackDesc: ''
    });
  }

  ngOnInit(): void {
    this.fetchPersonnel();
    this.fetchProductionLine();
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  showModal() {
    if (this.selectedMaintenanceSheet !== undefined) {
      this.selectedProductionLine = this.selectedMaintenanceSheet.productionLine;
      this.selectedProcess = this.selectedMaintenanceSheet.process;
      this.fetchProcess()
      this.isVisible = true;
    } else {
      this.nzMsgService.error("请选择一条数据查看");
    }
  }

  private buildForm() {
    //故障上报
    this.validateForm.setControl('code', new FormControl(this.selectedMaintenanceSheet.code));

    this.reporter = this.personnel.find(p => p.id == this.selectedMaintenanceSheet.submitter!.id)!;

    this.selectedProductionLine = this.productionLines.find(p => p.id == this.selectedMaintenanceSheet.productionLine!.id)!;

    this.selectedProcess = this.process.find(p => p.id == this.selectedMaintenanceSheet.process!.id)!;

    this.selectedEquipment = this.equipments.find(e => e.id == this.selectedMaintenanceSheet.equipment!.id)!;

    this.validateForm.setControl('description', new FormControl(this.selectedMaintenanceSheet.description));
    this.validateForm.setControl('dateOfReport', new FormControl(this.selectedMaintenanceSheet.malfunctionTime));
    //维修过程
  }

  fetchPersonnel(): void {
    const api = this.equipmentService.api + '/personnel/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.personnel = result.data;
    })
  }

  fetchProductionLine() {
    const api = this.equipmentService.api + '/production-line/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.productionLines = result.data;
    })
  }

  fetchProcess(): void {
    const api = this.equipmentService.api + '/plant/process/list';
    let param = {
      parentId: this.selectedProductionLine?.id,
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.process = result.data;
      this.fetchEquipments();
    })
  }

  fetchEquipments() {
    const api = this.equipmentService.api + '/equipments/process=' + this.selectedProcess!.id;

    this.equipmentService.getData(api).then((result: any) => {
      this.equipments = result.data;
      this.buildForm();
    });
  }
}

import {Component, Input, OnInit} from '@angular/core';

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
import {EquipmentService} from "../../../service/equipment.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-equipments-maintenance-standard-form',
  templateUrl: './equipments-maintenance-standard-form.component.html',

  styleUrls: ['./equipments-maintenance-standard-form.component.scss']
})
export class EquipmentsMaintenanceStandardFormComponent implements OnInit {
  @Input() selectedMaintenanceSheet!: EquipmentsMaintenanceSheet;

  validateForm: FormGroup;
  isVisible: boolean = false;
  isOkLoading: boolean = false;
  malfunctionTypes!: Array<string>;
  malfunctionType!: string;
  malfunctionLevels!: Array<string>;
  malfunctionLevel!: string;
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
  response!: number;
  quality!: number;
  fiveS!: number;
  overall!: number;


  constructor(private fb: FormBuilder,
              public nzMsgService: NzMessageService,
              public equipmentService: EquipmentService,
              ) {
    this.validateForm = this.fb.group({
      code: '',
      dateOfReport: '',
      description: '',
      dateOfDispatch: '',
      dispatchInfo: '',
      dateOfDeadline: '',
      malfunctionDesc: '',
      malfunctionLevelDesc: '',
      pauseTime: '',
      dateOfFinish: '',
      dateOfCheck: '',
      maintenanceDesc: '',
      precautions: '',
      dateOfValidation: '',
      validateDesc: '',
      validateJudgement: '',
      dateOfRate: '',
      feedbackDesc: '',
      responseRate:'',
      qualityRate:'',
      fiveSRate:'',
      overallRate:''
    });
  }

  ngOnInit(): void {
    this.fetchPersonnel();
    this.fetchProductionLine();
    this.fetchMalfunctionType();
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
      this.nzMsgService.error("???????????????????????????");
    }
  }

  private buildForm() {
    //????????????
    this.validateForm.setControl('code', new FormControl(this.selectedMaintenanceSheet.code));

    this.reporter = this.personnel.find(p => p.id == this.selectedMaintenanceSheet.submitter!.id)!;

    this.selectedProductionLine = this.productionLines.find(p => p.id == this.selectedMaintenanceSheet.productionLine!.id)!;

    this.selectedProcess = this.process.find(p => p.id == this.selectedMaintenanceSheet.process!.id)!;

    this.selectedEquipment = this.equipments.find(e => e.id == this.selectedMaintenanceSheet.equipment!.id)!;

    this.validateForm.setControl('description', new FormControl(this.selectedMaintenanceSheet.description));
    this.validateForm.setControl('dateOfReport', new FormControl(this.selectedMaintenanceSheet.malfunctionTime));
    //????????????
    this.maintainer = this.personnel.find(p => p.id == this.selectedMaintenanceSheet.maintenancePerson?.id)!;
    this.dispatchDate = this.selectedMaintenanceSheet.malfunctionTime;//todo use the right time;
    this.dispatcher = this.personnel.find(p => p.id == this.selectedMaintenanceSheet.dispatcher?.id)!;
    this.validateForm.setControl('dispatchInfo', new FormControl(this.selectedMaintenanceSheet.dispatchInfo));
    this.malfunctionType = this.malfunctionTypes.find(m => m == this.selectedMaintenanceSheet.malfunctionType)!;
    this.deadline = this.selectedMaintenanceSheet.deadline;
    this.malfunctionLevel = this.malfunctionLevels.find(m => m == this.selectedMaintenanceSheet.malfunctionLevel)!;
    //todo level description
    this.validateForm.setControl('malfunctionLevelDesc', new FormControl(this.selectedMaintenanceSheet.malfunctionDesc));
    this.validateForm.setControl('pauseTime', new FormControl(this.selectedMaintenanceSheet.pauseTime));
    this.finishDate = this.selectedMaintenanceSheet.finishTime;
    this.checker = this.personnel.find(p => p.id == this.selectedMaintenanceSheet.checker?.id)!
    this.validateForm.setControl('dateOfCheck', new FormControl(this.selectedMaintenanceSheet.checkDate));
    this.validateForm.setControl('maintenanceDesc', new FormControl(this.selectedMaintenanceSheet.maintenanceDesc));
    this.validateForm.setControl('precautions', new FormControl(this.selectedMaintenanceSheet.precaution));
    this.validateForm.setControl('dateOfDeadline', new FormControl(this.selectedMaintenanceSheet.deadline));
    this.validator = this.personnel.find(p => p.id == this.selectedMaintenanceSheet.validator?.id)!;
    this.validateForm.setControl('dateOfValidation', new FormControl(this.selectedMaintenanceSheet.validateTime));
    this.validateForm.setControl('validateJudgement',new FormControl(this.selectedMaintenanceSheet.validation));
    this.validateForm.setControl('validateDesc', new FormControl(this.selectedMaintenanceSheet.validateDesc));
    //??????
    this.fetchSpareParts();
    //????????????
    this.fetchRatings();
  }

  fetchRatings() {
    const api = this.equipmentService.api + '/rating';
    let param = {
      id: this.selectedMaintenanceSheet.id
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.response = result.data.responseRating;
      this.quality = result.data.qualityRating;
      this.fiveS = result.data.fiveSRating;
      this.overall = result.data.overallRating;
      this.ratePerson = this.personnel.find(p => p.id == result.data.ratePerson?.id)!;
      this.validateForm.setControl('dateOfRate',new FormControl(result.data.rateDate));
      this.validateForm.setControl('feedbackDesc',new FormControl(result.data.description));
    })
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

  private fetchMalfunctionType() {
    const api = this.equipmentService.api + '/config';
    this.equipmentService.getData(api).then((result: any) => {
      this.malfunctionTypes = JSON.parse(result.data.malfunctionType).map((item: any) => {
        return item.name
      });
      this.malfunctionLevels = JSON.parse(result.data.malfunctionLevel).map((item: any) => {
        return item.name;
      });
    });
  }

  fetchSpareParts() {
    const api = this.equipmentService.api + '/spare-part/maintenance'
    let param = {
      id:this.selectedMaintenanceSheet.id
    }
    this.equipmentService.getDataWithParams(api,param).then((result: any) => {
      this.listOfData = result.data
    })
  }
}

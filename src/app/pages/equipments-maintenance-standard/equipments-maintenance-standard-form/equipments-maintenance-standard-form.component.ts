import {Component, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {MalfunctionLevel, MalfunctionType} from "../../basicdata/basic-data-configs/basic-data-configs.component";
import {Equipment, Group, Person, Process, ProductionLine, SparePart} from "../../../model/model";
import {ResponseRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/response-rating/response-rating.component";
import {OverallRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/overall-rating/overall-rating.component";
import {FiveSRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/five-s-rating/five-s-rating.component";
import {QualityRatingComponent} from "../equipment-maintenance-validate-judgement/ratings/quality-rating/quality-rating.component";
import {EquipmentService} from "../../../service/equipment.service";

@Component({
  selector: 'app-equipments-maintenance-standard-form',
  templateUrl: './equipments-maintenance-standard-form.component.html',

  styleUrls: ['./equipments-maintenance-standard-form.component.scss']
})
export class EquipmentsMaintenanceStandardFormComponent implements OnInit {
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
  editable: boolean = false;
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
              public equipmentService: EquipmentService,
              public overallRatingComponent: OverallRatingComponent,
              public fiveSRatingComponent: FiveSRatingComponent,
              public qualityRatingComponent: QualityRatingComponent,
              public responseRatingComponent: ResponseRatingComponent,) {
    this.overallRating = overallRatingComponent;
    this.fiveSRating = fiveSRatingComponent;
    this.qualityRating = qualityRatingComponent;
    this.responseRating = responseRatingComponent;
    this.validateForm = this.fb.group({});
  }

  ngOnInit(): void {
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  showModal() {
    this.isVisible = true;
  }

  fetchProcess() {

  }

  fetchEquipments() {

  }
}

import {Component, OnInit} from '@angular/core';
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {Asset, Person, Process, ProductionLine} from "../../../model/model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EquipmentService} from "../../../service/equipment.service";

@Component({
  selector: 'app-basic-data-plant-layout',
  templateUrl: './basic-data-plant-layout.component.html',
  styleUrls: ['./basic-data-plant-layout.component.scss']
})
export class BasicDataPlantLayoutComponent implements OnInit {
  productionLines: Array<ProductionLine> = [

  ];
  selectedProductionLine!:ProductionLine;
  processes!: Array<Process>;
  selectedProcess!: Process;
  assets!: Array<Asset>;
  selectedAsset!: Asset;



  isVisible = false;
  isOkLoading = false;
  title!: string;
  plantForm!: FormGroup;
  editType!: string;

  map: Map<string, string> = new Map()
  levelMap: Map<number, string> = new Map()
  parentItem!: any;
  selectedItem!: any;
  level = 'productionLine';

  processOptions: Array<Process> = [];
  assetsOptions : Array<Asset> = []
  options:Array<any> = []
  selectedPerson!: Person;
  responsibilities: Array<Person> = [];
  selectedOption!: any;

  constructor(public fb: FormBuilder, public nzContextMenuService: NzContextMenuService, public equipmentService: EquipmentService) {
  }

  showModal(item: any, level: number, type: string): void {
    this.title = this.map.get(type)!;
    this.selectedItem = item;
    switch (level) {
      case 0:
        this.parentItem = null;
        break;
      case 1:
        this.parentItem = this.selectedProductionLine;
        this.options = this.processOptions;
        break;
      case 2:
        this.parentItem = this.selectedProcess;
        this.options = this.assetsOptions;
        break;
    }
    this.level = this.levelMap.get(level)!;
    this.editType = type;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.dealWithItems();
  }

  private dealWithItems() {
    let api = this.equipmentService.api + '/plant/' + this.level + '/' + this.editType;
    let param = {
      parentId: this.parentItem?.id!,
      id: this.selectedOption?.id!,
      name:this.plantForm.get("name")?.value!,
      groupLeader: this.selectedPerson?.id
    }
    this.equipmentService.postData(api, param).then(() => {
      this.isOkLoading = false;
      this.isVisible = false;
      this.initialData();
    });
    this.resetForm();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent) {
    this.nzContextMenuService.create($event, menu);
  }

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      name: new FormControl(),
      responsible: new FormControl()
    })
    this.map.set("add", "??????");
    this.map.set("edit", "??????");
    this.map.set("delete", "??????");
    this.levelMap.set(0, "production-line");
    this.levelMap.set(1, "process");
    this.levelMap.set(2, "asset");
    this.initialData();
    this.fetchPersonnelAsOptions();
    this.fetchProcessAsOptions();
    this.fetchAssetAsOptions();
  }

  private initialData() {
    let api = this.equipmentService.api + '/plant/production-line/list'
    this.equipmentService.getData(api).then((result: any) => {
      this.productionLines = result.data;
      if (this.productionLines.length > 0) {
        this.selectedProductionLine = this.productionLines[0]
        this.selectedProductionLine.isSelected = true;
        api = this.equipmentService.api + '/plant/process/list'
        let param = {
          parentId: this.selectedProductionLine.id
        }
        this.equipmentService.getDataWithParams(api, param).then((result: any) => {
          this.processes = result.data;
          if (this.processes.length > 0) {
            this.selectedProcess = this.processes[0]
            this.selectedProcess.isSelected = true;
            api = this.equipmentService.api + '/plant/asset/list'
            let param = {
              parentId: this.selectedProcess.id
            }
            this.equipmentService.getDataWithParams(api, param).then((result: any) => {
              this.assets = result.data;
              if (this.assets.length > 0) {
                this.selectedAsset = this.assets[0];
                this.selectedAsset.isSelected = true;
              }
            })
          }
        })
      }
    })
  }

  fetchPersonnelAsOptions(): void {
    const api = this.equipmentService.api+'/personnel/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.responsibilities = result.data;
    })
  }

  fetchProcessAsOptions(): void {
    const api = this.equipmentService.api+'/process/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.processOptions = result.data;
    })
  }

  fetchAssetAsOptions(): void {
    const api = this.equipmentService.api+'/asset/list';
    this.equipmentService.getData(api).then((result: any) => {
      this.assetsOptions = result.data;
    })
  }

  private getProductionLine() {
    let api = this.equipmentService.api + '/plant/production-line/list'
    this.equipmentService.getData(api).then((result: any) => {
      this.productionLines = result.data;
    })
  }

  private getProcessByProductionId() {
    let api = this.equipmentService.api + '/plant/process/list'
    let param = {
      parentId: this.selectedProductionLine.id
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.processes = result.data;
      if (this.processes.length > 0) {
        this.selectedProcess = this.processes[0];
        this.selectProcess(this.selectedProcess);
      }else{
        this.assets = []
      }
    })
  }

  private getAssetByProcessId() {
    let api = this.equipmentService.api + '/plant/asset/list'
    let param = {
      parentId: this.selectedProcess.id
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.assets = result.data;
      if (this.assets.length > 0) {
        this.selectedAsset = this.assets[0];
        this.selectAsset(this.selectedAsset);
      }
    })
  }

  selectProductionLine(item: ProductionLine) {
    this.selectedProductionLine.isSelected = false;
    this.selectedProductionLine = item;
    this.selectedProductionLine.isSelected = true;
    this.getProcessByProductionId()
  }

  selectProcess(item: Process) {
    this.selectedProcess.isSelected = false;
    this.selectedProcess = item;
    this.selectedProcess.isSelected = true;
    this.getAssetByProcessId();
  }

  selectAsset(item: Asset) {
    this.selectedAsset.isSelected = false;
    this.selectedAsset = item;
    this.selectedAsset.isSelected = true;
  }

  resetForm(){
    this.selectedOption = null;
    this.plantForm.reset();
  }
}

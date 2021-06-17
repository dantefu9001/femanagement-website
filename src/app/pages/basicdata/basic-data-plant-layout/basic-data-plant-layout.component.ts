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
    {
      isSelected: true,
      id: "0",
      name: "test"
    },
    {
      isSelected: false,
      id: "1",
      name: "test2"
    }
  ];
  selectedProductionLine = this.productionLines[0];
  processes!: Array<Process>;
  selectedProcess!: Process;
  assets!: Array<Asset>;
  selectedAsset!: Asset;


  isVisible = false;
  isOkLoading = false;
  title!: string;
  plantForm!: FormGroup;
  editType!: string;

  selectedPerson!: Person;
  responsibilities: Array<Person> = [{
    name: 'zenan',
    id: "1"
  }];
  map: Map<string, string> = new Map()
  levelMap: Map<number, string> = new Map()
  parentItem!: any;
  selectedItem!: any;
  level = 'productionLine';


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
        break;
      case 2:
        this.parentItem = this.selectedProcess;
    }
    this.level = this.levelMap.get(level)!;
    this.editType = type;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    // this.dealWithItems();
  }

  private dealWithItems() {
    let api = this.equipmentService.api + '/plant/' + this.level + '/' + this.editType;
    let param = {
      parentId: this.parentItem!.id!,
      id: this.selectedItem!.id!
    }
    this.equipmentService.postData(api, param).then(() => {
      this.isOkLoading = false;
      this.isVisible = false;
      this.initialData();
    });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent) {
    this.nzContextMenuService.create($event, menu);
  }

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      name: new FormControl(),
      responsible: new FormControl()
    })
    this.map.set("add", "新增");
    this.map.set("edit", "编辑");
    this.map.set("delete", "删除");
    this.levelMap.set(0, "productionLine");
    this.levelMap.set(1, "process");
    this.levelMap.set(2, "asset");
    // this.initialData();
  }

  private initialData() {
    let api = this.equipmentService.api + '/plant/production-line/list'
    let param = {
      id: '-1'
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.productionLines = result.data;
      if (this.productionLines.length > 0) {
        this.selectedProductionLine = this.productionLines[0]
        api = this.equipmentService.api + '/plant/process/list'
        param = {
          id: this.selectedProductionLine.id
        }
        this.equipmentService.getDataWithParams(api, param).then((result: any) => {
          this.processes = result.data;
          if (this.processes.length > 0) {
            this.selectedProcess = this.processes[0]
            api = this.equipmentService.api + '/plant/asset/list'
            param = {
              id: this.selectedProcess.id
            }
            this.equipmentService.getDataWithParams(api, param).then((result: any) => {
              this.assets = result.data;
              if (this.assets.length > 0) {
                this.selectedAsset = this.assets[0]
              }
            })
          }
        })
      }
    })
  }

  private getProductionLine() {
    let api = this.equipmentService.api + '/plant/production-line/list'
    this.equipmentService.getData(api).then((result: any) => {
      this.productionLines = result.data;
    })
  }

  private getProcess() {
    let api = this.equipmentService.api + '/plant/process/list'
    let param = {
      id: this.selectedProductionLine.id
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.productionLines = result.data;
    })
  }

  private getAsset() {
    let api = this.equipmentService.api + '/plant/asset/list'
    let param = {
      id: this.selectedProcess.id
    }
    this.equipmentService.getDataWithParams(api, param).then((result: any) => {
      this.productionLines = result.data;
    })
  }

  selectProductionLine(item: ProductionLine) {
    this.selectedProductionLine.isSelected = false;
    this.selectedProductionLine = item;
    this.selectedProductionLine.isSelected = true;
  }
}

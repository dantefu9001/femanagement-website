export interface Equipment {
  isSelected: boolean,
  id: number;
  picture: string
  name: string;
  code: string;
  responsible: Person;
  productionLine: ProductionLine;//车间
  process: Process;//工序
  asset: Asset;//工位
  equipmentGroup: EquipmentGroup;
  description: string;
  isAutoDispatch: number;
  status: string;
  model: string;
  manufacturer: string;
  specification: string;
  serialNumber: string;
  dateOfProduction: Date;
  dateOfInstallation: Date;
  dateOfFirstUse: Date;
  dateOfExpiration: Date;
  expiresYears: string;
  customAttributes: string;
  isDelete: string;
  enterprise: string;
}

export interface EquipmentGroup {
  id: number;
  name: string;
  isImport: boolean;
  isSelected: boolean;
}

export interface SelfDefinedAttribute {
  id: string;
  name: string;
  value: string;
  remark: string;
}

export interface Person {
  id: string;
  name: string;
}

export interface ProductionLine {
  isSelected: boolean;
  id: string,
  name: string;
}

export interface Area {
  id: string;
  name: string;
}

export interface Process {
  isSelected: boolean;
  id: string;
  name: string;
}

export interface Asset {
  isSelected: boolean;
  id: string;
  name: string;
}

export interface Status {
  value: string;
  id: string;
}

export interface EquipmentsSummary {
  id: number;
  type: string;
  group: number;
  summaryTime: string;
  personnel: number;
  summary: string;
}

export interface EquipmentsMaintenanceSheet {
  checker: Person;
  rateDesc: string;
  rateDate: Date;
  ratePerson: Person;
  checkDate: Date;
  finishTime: Date;
  malfunctionDesc: string;
  malfunctionLevel: string;
  deadline: Date;
  dispatchInfo: string;
  dispatcher: Person;
  id: number;
  code: string,
  submitter: Person;
  productionLine: ProductionLine,
  process: Process,
  equipment: Equipment,
  nonEquipment: boolean,
  malfunctionTime: Date,
  description: string,
  maintenancePerson: Person,
  malfunctionType: string,
  ratingOfMaintenance: string,
  status: string,
  picUrls: string[],
  pauseTime: string,
  maintenanceDesc: string,
  auditor: Person,
  auditTime: Date
  action:string,
  precaution:string,
  validator:Person,
  validation:string,
  validateTime:Date,
  validateDesc:string
}

export interface SparePart {
  id: number,
  code: string,
  name: string,
  stock: number,
  unit: string,
  consumption: number,
  period: number,
  remark: string,
}

export enum MaintenanceStatus {
  SUBMITTED="已提交",
  TO_BE_DISPATCHED="待分派",
  DISPATCHED="已分派",
  MAINTAINED="已维修",
  CONFIRMED="已确认",
  RATED="已评价",
  VALIDATED="已验证",
  VALIDATION_APPROVED="验证已审核"
}


export interface Group {
  name: string,
  id: number
}

export interface summaryType {
  name: string,
  value: string
}

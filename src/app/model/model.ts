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
  id: number;
  code: string,
  productionLine: string,
  equipment: string,
  nonEquipment: boolean,
  malfunctionTime: string,
  description: string,
  maintenancePerson: string,
  malfunctionType: string,
  ratingOfMaintenance: string,
  status: string,
  picUrls: string[]
}

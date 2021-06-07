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
  id: string,
  name: string;
}

export interface Area {
  id: string;
  name: string;
}

export interface Process {
  id: string;
  name: string;
}

export interface Asset {
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

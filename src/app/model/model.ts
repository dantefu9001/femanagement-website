export interface Equipment {
  isSelected: boolean,
  id: number;
  picture: string
  name: string;
  code: string;
  responsible: string;
  workshop: string;//车间
  process: string;//工序
  station: string;//工位
  equipmentGroup: string;
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

export interface Workshop {
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

export interface Station {
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

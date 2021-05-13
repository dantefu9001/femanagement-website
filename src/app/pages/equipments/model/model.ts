export interface Equipment {
  id: number;
  name: string;
  code: string;
  responsible: string;
  productionLine: string;
  process: string;
  asset: string;
  equipmentGroup: string;
  description: string;
  isAutoDispatch: number;
  status: string;
  model: string;
  manufacturer: string;
  specification: string;
  serialNumber: string;
  dateOfProduction: string;
  dateOfInstallation: string;
  dateOfFirstUse: string;
  expireYears: string;
  dateOfExpiration: string;
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

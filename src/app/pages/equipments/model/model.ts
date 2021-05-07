export interface Equipment {
  id: number;
  name: string;
  code: string;
  responsible: string;
  production_line: string;
  process: string;
  asset: string;
  equipment_groups: string;
  description: string;
  is_auto_dispatch: string;
  status: string;
  model: string;
  manufacturer: string;
  specification: string;
  serial_number: string;
  data_of_production: string;
  date_of_installation: string;
  date_of_first_use: string;
  expire_years: string;
  date_of_expiration: string;
  custom_attributes: string;
  is_delete: string;
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

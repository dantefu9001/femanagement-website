export interface Equipment {
  id: number;
  name: string;
  code: string;
}

export interface EquipmentGroup {
  id: number;
  name: string;
}

export interface SelfDefinedAttribute{
  id: string;
  name: string;
  value: string;
  remark: string;
}
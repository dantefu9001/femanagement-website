import {Component, OnInit} from '@angular/core';
import {SelfDefinedAttribute} from "../../model/model";

@Component({
  selector: 'app-equipment-attributes-table',
  templateUrl: './equipment-attributes-table.component.html',
  styleUrls: ['./equipment-attributes-table.component.scss']
})
export class EquipmentAttributesTableComponent implements OnInit {
  i = 0;
  editId: string | null = null;
  selfDefinedAttributes: SelfDefinedAttribute[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.selfDefinedAttributes = [
      ...this.selfDefinedAttributes,
      {
        id: `${this.i}`,
        name: ``,
        value: ``,
        remark: ``
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.selfDefinedAttributes = this.selfDefinedAttributes.filter(d => d.id !== id);
  }

  ngOnInit(): void {
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-equipment-maintenance-record-edit',
  templateUrl: './equipment-maintenance-record-edit.component.html'
})
export class EquipmentMaintenanceRecordEditComponent {
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}

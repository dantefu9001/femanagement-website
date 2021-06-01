import { Component } from '@angular/core';

@Component({
  selector: 'app-equipments-maintenance-job-booking-modal',
  templateUrl: './equipments-maintenance-job-booking-modal.component.html'
})
export class EquipmentsMaintenanceJobBookingModalComponent {
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

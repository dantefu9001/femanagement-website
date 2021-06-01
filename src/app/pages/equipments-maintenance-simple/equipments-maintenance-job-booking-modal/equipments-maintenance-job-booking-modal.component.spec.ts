import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceJobBookingModalComponent } from './equipments-maintenance-job-booking-modal.component';

describe('EquipmentsMaintenanceJobBookingModalComponent', () => {
  let component: EquipmentsMaintenanceJobBookingModalComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceJobBookingModalComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceJobBookingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceJobBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

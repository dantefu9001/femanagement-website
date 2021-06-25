import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceJobBookingModalFormComponent } from './equipments-maintenance-job-booking-modal-form.component';

describe('EquipmentsMaintenanceJobBookingModalFormComponent', () => {
  let component: EquipmentsMaintenanceJobBookingModalFormComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceJobBookingModalFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceJobBookingModalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceJobBookingModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

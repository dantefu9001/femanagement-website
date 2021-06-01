import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceJobBookingFormComponent } from './equipments-maintenance-job-booking-form.component';

describe('EquipmentsMaintenanceJobBookingFormComponent', () => {
  let component: EquipmentsMaintenanceJobBookingFormComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceJobBookingFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceJobBookingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceJobBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

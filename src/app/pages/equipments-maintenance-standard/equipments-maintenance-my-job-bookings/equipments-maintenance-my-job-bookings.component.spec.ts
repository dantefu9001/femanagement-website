import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceMyJobBookingsComponent } from './equipments-maintenance-my-job-bookings.component';

describe('EquipmentsMaintenanceMyJobBookingsComponent', () => {
  let component: EquipmentsMaintenanceMyJobBookingsComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceMyJobBookingsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceMyJobBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceMyJobBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

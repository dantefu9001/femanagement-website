import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceJobBookingTableComponent } from './equipments-maintenance-job-booking-table.component';

describe('EquipmentsMaintenanceJobBookingTableComponent', () => {
  let component: EquipmentsMaintenanceJobBookingTableComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceJobBookingTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceJobBookingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceJobBookingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

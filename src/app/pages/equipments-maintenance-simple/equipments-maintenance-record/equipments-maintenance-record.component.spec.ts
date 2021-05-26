import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceRecordComponent } from './equipments-maintenance-record.component';

describe('EquipmentsMaintenanceRecordComponent', () => {
  let component: EquipmentsMaintenanceRecordComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceRecordComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

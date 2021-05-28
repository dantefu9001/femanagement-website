import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceManagementUnfinishedComponent } from './equipments-maintenance-management-unfinished.component';

describe('EquipmentsMaintenanceManagementUnfinishedComponent', () => {
  let component: EquipmentsMaintenanceManagementUnfinishedComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceManagementUnfinishedComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceManagementUnfinishedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceManagementUnfinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

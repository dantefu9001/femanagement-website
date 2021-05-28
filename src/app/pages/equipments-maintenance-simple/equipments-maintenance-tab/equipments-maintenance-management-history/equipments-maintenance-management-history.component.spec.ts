import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceManagementHistoryComponent } from './equipments-maintenance-management-history.component';

describe('EquipmentsMaintenanceManagementHistoryComponent', () => {
  let component: EquipmentsMaintenanceManagementHistoryComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceManagementHistoryComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceManagementHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceManagementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

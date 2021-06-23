import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceValidateTabComponent } from './equipments-maintenance-validate-tab.component';

describe('EquipmentsMaintenanceValidateTabComponent', () => {
  let component: EquipmentsMaintenanceValidateTabComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceValidateTabComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceValidateTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceValidateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

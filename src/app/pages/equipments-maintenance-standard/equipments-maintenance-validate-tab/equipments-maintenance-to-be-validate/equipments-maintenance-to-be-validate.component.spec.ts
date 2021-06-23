import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceToBeValidateComponent } from './equipments-maintenance-to-be-validate.component';

describe('EquipmentsMaintenanceToBeValidateComponent', () => {
  let component: EquipmentsMaintenanceToBeValidateComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceToBeValidateComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceToBeValidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceToBeValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

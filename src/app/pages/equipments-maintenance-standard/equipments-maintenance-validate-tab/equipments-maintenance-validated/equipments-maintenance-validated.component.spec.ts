import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceValidatedComponent } from './equipments-maintenance-validated.component';

describe('EquipmentsMaintenanceValidatedComponent', () => {
  let component: EquipmentsMaintenanceValidatedComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceValidatedComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceValidatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceValidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceStandardFormComponent } from './equipments-maintenance-standard-form.component';

describe('EquipmentsMaintenanceStandardFormComponent', () => {
  let component: EquipmentsMaintenanceStandardFormComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceStandardFormComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceStandardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceStandardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

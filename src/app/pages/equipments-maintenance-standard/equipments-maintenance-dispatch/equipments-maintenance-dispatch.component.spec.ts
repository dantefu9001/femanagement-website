import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceDispatchComponent } from './equipments-maintenance-dispatch.component';

describe('EquipmentsMaintenanceDispatchComponent', () => {
  let component: EquipmentsMaintenanceDispatchComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceDispatchComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceDispatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

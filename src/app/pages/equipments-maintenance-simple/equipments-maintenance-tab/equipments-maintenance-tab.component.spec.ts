import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsMaintenanceTabComponent } from './equipments-maintenance-tab.component';

describe('EquipmentsMaintenanceTabComponent', () => {
  let component: EquipmentsMaintenanceTabComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceTabComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsMaintenanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

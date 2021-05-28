import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentMaintenanceRecordEditComponent } from './equipment-maintenance-record-edit.component';

describe('EquipmentMaintenanceRecordEditComponent', () => {
  let component: EquipmentMaintenanceRecordEditComponent;
  let fixture: ComponentFixture<EquipmentMaintenanceRecordEditComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMaintenanceRecordEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentMaintenanceRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

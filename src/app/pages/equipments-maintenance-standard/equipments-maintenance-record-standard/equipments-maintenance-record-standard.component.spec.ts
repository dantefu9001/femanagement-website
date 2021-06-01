import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsMaintenanceRecordStandardComponent } from './equipments-maintenance-record-standard.component';

describe('EquipmentsMaintenanceRecordStandardComponent', () => {
  let component: EquipmentsMaintenanceRecordStandardComponent;
  let fixture: ComponentFixture<EquipmentsMaintenanceRecordStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentsMaintenanceRecordStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentsMaintenanceRecordStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

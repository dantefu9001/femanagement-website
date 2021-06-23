import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentMaintenanceValidateJudgementComponent } from './equipment-maintenance-validate-judgement.component';

describe('EquipmentMaintenanceValidateJudgementComponent', () => {
  let component: EquipmentMaintenanceValidateJudgementComponent;
  let fixture: ComponentFixture<EquipmentMaintenanceValidateJudgementComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMaintenanceValidateJudgementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentMaintenanceValidateJudgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

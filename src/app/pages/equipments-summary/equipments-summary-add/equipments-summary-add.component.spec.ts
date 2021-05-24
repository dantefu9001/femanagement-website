import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsSummaryAddComponent } from './equipments-summary-add.component';

describe('EquipmentsSummaryAddComponent', () => {
  let component: EquipmentsSummaryAddComponent;
  let fixture: ComponentFixture<EquipmentsSummaryAddComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsSummaryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsSummaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentsSummaryComponent } from './equipments-summary.component';

describe('EquipmentsSummaryComponent', () => {
  let component: EquipmentsSummaryComponent;
  let fixture: ComponentFixture<EquipmentsSummaryComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

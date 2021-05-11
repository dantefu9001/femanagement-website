import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentParamsTableComponent } from './equipment-params-table.component';

describe('EquipmentParamsTableComponent', () => {
  let component: EquipmentParamsTableComponent;
  let fixture: ComponentFixture<EquipmentParamsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentParamsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentParamsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

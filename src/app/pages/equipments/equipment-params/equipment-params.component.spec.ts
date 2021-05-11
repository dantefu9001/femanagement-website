import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentParamsComponent } from './equipment-params.component';

describe('EquipmentParamsComponent', () => {
  let component: EquipmentParamsComponent;
  let fixture: ComponentFixture<EquipmentParamsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentGroupComponent } from './equipment-group.component';

describe('EquipmentGroupComponent', () => {
  let component: EquipmentGroupComponent;
  let fixture: ComponentFixture<EquipmentGroupComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

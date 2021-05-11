import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentAttributesTableComponent } from './equipment-attributes-table.component';

describe('EquipmentAttributesTableComponent', () => {
  let component: EquipmentAttributesTableComponent;
  let fixture: ComponentFixture<EquipmentAttributesTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentAttributesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentAttributesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

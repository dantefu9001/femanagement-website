import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentTagComponent } from './equipment-tag.component';

describe('EquipmentTagComponent', () => {
  let component: EquipmentTagComponent;
  let fixture: ComponentFixture<EquipmentTagComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

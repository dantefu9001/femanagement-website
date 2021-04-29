import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentEditComponent } from './equipment-edit.component';

describe('EquipmentEditComponent', () => {
  let component: EquipmentEditComponent;
  let fixture: ComponentFixture<EquipmentEditComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

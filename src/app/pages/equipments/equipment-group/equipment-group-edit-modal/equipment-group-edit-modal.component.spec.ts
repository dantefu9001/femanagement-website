import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentGroupEditModalComponent } from './equipment-group-edit-modal.component';

describe('EquipmentGroupEditModalComponent', () => {
  let component: EquipmentGroupEditModalComponent;
  let fixture: ComponentFixture<EquipmentGroupEditModalComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentGroupEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentGroupEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

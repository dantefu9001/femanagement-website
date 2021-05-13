import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentEditUploadPicComponent } from './equipment-edit-upload-pic.component';

describe('EquipmentEditUploadPicComponent', () => {
  let component: EquipmentEditUploadPicComponent;
  let fixture: ComponentFixture<EquipmentEditUploadPicComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentEditUploadPicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentEditUploadPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

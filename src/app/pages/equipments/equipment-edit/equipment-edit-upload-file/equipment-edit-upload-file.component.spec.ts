import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentEditUploadFileComponent } from './equipment-edit-upload-file.component';

describe('EquipmentEditUploadFileComponent', () => {
  let component: EquipmentEditUploadFileComponent;
  let fixture: ComponentFixture<EquipmentEditUploadFileComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentEditUploadFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentEditUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

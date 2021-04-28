import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentSearchComponent } from './equipment-search.component';

describe('EquipmentSearchComponent', () => {
  let component: EquipmentSearchComponent;
  let fixture: ComponentFixture<EquipmentSearchComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

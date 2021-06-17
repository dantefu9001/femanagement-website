import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicDataPlantLayoutComponent } from './basic-data-plant-layout.component';

describe('BasicDataPlantLayoutComponent', () => {
  let component: BasicDataPlantLayoutComponent;
  let fixture: ComponentFixture<BasicDataPlantLayoutComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDataPlantLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDataPlantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

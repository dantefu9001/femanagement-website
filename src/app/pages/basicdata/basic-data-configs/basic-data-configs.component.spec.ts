import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicDataConfigsComponent } from './basic-data-configs.component';

describe('BasicdataConfigsComponent', () => {
  let component: BasicDataConfigsComponent;
  let fixture: ComponentFixture<BasicDataConfigsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDataConfigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDataConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

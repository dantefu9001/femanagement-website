import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicdataConfigsComponent } from './basicdata-configs.component';

describe('BasicdataConfigsComponent', () => {
  let component: BasicdataConfigsComponent;
  let fixture: ComponentFixture<BasicdataConfigsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicdataConfigsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicdataConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

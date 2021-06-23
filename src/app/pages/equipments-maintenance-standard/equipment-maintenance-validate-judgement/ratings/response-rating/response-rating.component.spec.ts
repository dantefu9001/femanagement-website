import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseRatingComponent } from './response-rating.component';

describe('ResponseRatingComponent', () => {
  let component: ResponseRatingComponent;
  let fixture: ComponentFixture<ResponseRatingComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

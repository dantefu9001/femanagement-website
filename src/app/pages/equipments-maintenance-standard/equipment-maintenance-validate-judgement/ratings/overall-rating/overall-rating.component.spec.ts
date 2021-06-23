import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { OverallRatingComponent } from './overall-rating.component';

describe('OverallRatingComponent', () => {
  let component: OverallRatingComponent;
  let fixture: ComponentFixture<OverallRatingComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

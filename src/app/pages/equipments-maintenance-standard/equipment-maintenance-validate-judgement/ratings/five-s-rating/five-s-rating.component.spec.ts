import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FiveSRatingComponent } from './five-s-rating.component';

describe('FiveSRatingComponent', () => {
  let component: FiveSRatingComponent;
  let fixture: ComponentFixture<FiveSRatingComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveSRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiveSRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

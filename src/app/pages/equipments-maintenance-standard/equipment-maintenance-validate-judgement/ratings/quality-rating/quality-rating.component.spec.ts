import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityRatingComponent } from './quality-rating.component';

describe('QualityRatingComponent', () => {
  let component: QualityRatingComponent;
  let fixture: ComponentFixture<QualityRatingComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

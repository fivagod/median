import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyMedianComponent } from './lazy-median.component';

describe('LazyMedianComponent', () => {
  let component: LazyMedianComponent;
  let fixture: ComponentFixture<LazyMedianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyMedianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyMedianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

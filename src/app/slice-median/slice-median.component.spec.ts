import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliceMedianComponent } from './slice-median.component';

describe('SliceMedianComponent', () => {
  let component: SliceMedianComponent;
  let fixture: ComponentFixture<SliceMedianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliceMedianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliceMedianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

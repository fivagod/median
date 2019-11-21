import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMedianComponent } from './simple-median.component';

describe('SimpleMedianComponent', () => {
  let component: SimpleMedianComponent;
  let fixture: ComponentFixture<SimpleMedianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleMedianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleMedianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

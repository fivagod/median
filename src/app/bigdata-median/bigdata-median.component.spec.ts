import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigdataMedianComponent } from './bigdata-median.component';

describe('BigdataMedianComponent', () => {
  let component: BigdataMedianComponent;
  let fixture: ComponentFixture<BigdataMedianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataMedianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataMedianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

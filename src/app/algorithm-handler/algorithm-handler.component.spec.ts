import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmHandlerComponent } from './algorithm-handler.component';

describe('AlgorithmHandlerComponent', () => {
  let component: AlgorithmHandlerComponent;
  let fixture: ComponentFixture<AlgorithmHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

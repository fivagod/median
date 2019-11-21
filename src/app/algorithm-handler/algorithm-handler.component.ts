import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';

import {SimpleMedianComponent} from '../simple-median/simple-median.component';
import {SliceMedianComponent} from '../slice-median/slice-median.component';
import {LazyMedianComponent} from '../lazy-median/lazy-median.component';
import {BigdataMedianComponent} from '../bigdata-median/bigdata-median.component';

import {AlgDirective} from './algorithm-handler.directive';
import {ComponentMap, componentStrategy} from '../shared/models/algorithm.model';
import {ArrayHandlerService} from '../array-handler.service';

const componentMap: ComponentMap = {
  simple: SimpleMedianComponent,
  slice: SliceMedianComponent,
  bigdata: BigdataMedianComponent,
  lazy: LazyMedianComponent
};

@Component({
  selector: 'app-algorithm-handler',
  templateUrl: './algorithm-handler.component.html',
  styleUrls: ['./algorithm-handler.component.css']
})
export class AlgorithmHandlerComponent implements OnInit {

  @Input() strategy: componentStrategy;
  @ViewChild(AlgDirective, {static: true}) algHost: AlgDirective;

  public result: number | undefined;
  public time: string | undefined;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private arrayHandler: ArrayHandlerService) { }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentMap[this.strategy] as any);

    const viewContainerRef = this.algHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }
  // Main processor
  Process(): void {
    const startTime: number = performance.now();
    this.arrayHandler.processStrategy(this.strategy).subscribe(value => {
      this.result = value;
      this.time = ((performance.now() - startTime) / 1000).toFixed(2);
    });
  }
}

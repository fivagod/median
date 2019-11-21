import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PrismModule } from '@ngx-prism/core'; // <----- Here

import { AppComponent } from './app.component';
import { SimpleMedianComponent } from './simple-median/simple-median.component';
import { SliceMedianComponent } from './slice-median/slice-median.component';
import { BigdataMedianComponent } from './bigdata-median/bigdata-median.component';
import { LazyMedianComponent } from './lazy-median/lazy-median.component';
import { AlgorithmHandlerComponent } from './algorithm-handler/algorithm-handler.component';

import {AlgDirective} from './algorithm-handler/algorithm-handler.directive';

import { ArrayHandlerService } from './array-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    SimpleMedianComponent,
    SliceMedianComponent,
    LazyMedianComponent,
    BigdataMedianComponent,
    AlgorithmHandlerComponent,
    AlgDirective
  ],
  imports: [
    BrowserModule,
    PrismModule
  ],
  providers: [ArrayHandlerService],
  bootstrap: [AppComponent],
  entryComponents: [
    SimpleMedianComponent,
    SliceMedianComponent,
    LazyMedianComponent,
    BigdataMedianComponent
  ]
})
export class AppModule { }

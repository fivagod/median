import {SimpleMedianComponent} from '../../simple-median/simple-median.component';
import {SliceMedianComponent} from '../../slice-median/slice-median.component';
import {BigdataMedianComponent} from '../../bigdata-median/bigdata-median.component';
import {LazyMedianComponent} from '../../lazy-median/lazy-median.component';

export interface ComponentMap {
  simple?: SimpleMedianComponent;
  slice?: SliceMedianComponent;
  bigdata?: BigdataMedianComponent;
  lazy?: LazyMedianComponent;
}

export type componentStrategy = keyof ComponentMap;

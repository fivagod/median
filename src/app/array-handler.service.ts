import { Injectable } from '@angular/core';
import { Observable, Subject, OperatorFunction, MonoTypeOperatorFunction } from 'rxjs';
import { tap, toArray, map } from 'rxjs/operators';

import {MedianOfMedians} from './shared/utils/medianOfMedians';

import {componentStrategy} from './shared/models/algorithm.model';

type RxOperator = (OperatorFunction<any, any> | MonoTypeOperatorFunction<any>)[];

const decoder = new TextDecoder('utf-8');

@Injectable({
  providedIn: 'root'
})
export class ArrayHandlerService {

  private observers: {[key in componentStrategy] : Observable<number>} | {} = {};

  constructor() { }
  processStrategy(strategy: componentStrategy): Observable<number> {
    const modifiers = this.getModifiers(strategy);
    return modifiers.reduce((ob: Observable<number>, op: OperatorFunction<any, any>) => ob.pipe(op), this.handle(strategy));
  }
  handle(strategy: componentStrategy): Observable<number> {
    // create observer which will emit all data
    this.observers[strategy] = new Subject<number>();

    // we use fetch instead of common/http because fetch can return readable stream, is very useful for huge data
    fetch('/assets/array.txt')
    .then(response => response.body.getReader())
    .then( reader => {
      this.readData(strategy, reader);
    }
    );
    return this.observers[strategy];
  }
  readData(strategy: componentStrategy, reader, tail: string = ''): void {
    reader.read().then(({ done, value }) => {
      // read data by chunks and remember tail
      const valueStr: string[] = (!value ? tail : (tail + decoder.decode(value))).split(/[\r\n]+/);
      if (!done || (done && valueStr.length === 1 && valueStr[0] === '')) {
        tail = valueStr.pop();
      }
      this.observers[strategy].next(valueStr);
      if (!done) {
        this.readData(strategy, reader, tail);
      } else {
        this.observers[strategy].complete();
      }
    });
  }
  getModifiers(strategy: componentStrategy): RxOperator {
    const ret = [
      toArray(),
      map(val => Array.isArray(val) && val.reduce((acc, cur) => acc.concat([...cur]), []).map(a => parseInt(a, 10)))
    ];
    // algoritm handlers
    switch (strategy) {
      case 'simple':
        ret.push(
          // main function
          map(arr => {
            if (Array.isArray(arr)) {
              arr.sort();
              const median = arr.length % 2 === 0
                ? (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
                : arr[Math.floor(arr.length / 2)];
              return median;
            }
          })
        );
        break;
      case 'slice':
        ret.push(
          // main function
          // tap(val => console.log(val)),
          map(arr => {
            if (Array.isArray(arr)) {
              arr.sort();
              const splice = arr.splice(Math.ceil(arr.length / 2) - 1, 2 - (arr.length % 2));
              const median = (splice[0] + (splice[1] || 0)) / splice.length;
              return median;
            }
          })
        );
        break;
      case 'lazy':
        ret.push(
          // main function
          map(arr => {
            if (Array.isArray(arr)) {
              arr.sort();
              while (arr.length > 2) {
                arr.shift();
                arr.pop();
              }
              const median = (arr[0] + (arr[1] || 0)) / arr.length;
              return median;
            }
          })
        );
        break;
      case 'bigdata':
        ret.push(
          // tap(val => console.log(val)),
          map(arr => {
            if (Array.isArray(arr)) {
              const median = new MedianOfMedians(arr);
              return median.median;
            }
          })
        );
        break;
    }
    return ret;
  }
}

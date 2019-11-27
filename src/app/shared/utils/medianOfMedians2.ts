// now works only with arrays which have odd length
// implemented as recursive function from here
// https://brilliant.org/wiki/median-finding-algorithm/
// mixed promises with rx.js, if you can avoid promise - please call me :)

import { Subject, from, Observable } from 'rxjs';
import { map, bufferWhen, tap, skip, last, flatMap, bufferCount } from 'rxjs/operators';

export default function getMedianOfMedians(sequence$: Observable<number>, position?: number): Promise<number> {
  return new Promise( (resolve, reject) => {
  const left = [];
  const right = [];
  const medians = [];
  const medSubj = new Subject();
  const medians$ = medSubj.pipe(
    skip(1),
    tap(a => medians.push(a)),
    last()
  );
  const sourceObs = sequence$.pipe(
    bufferCount(5),
    // tap(a => console.log(a)),
    flatMap(a => {
      if (Array.isArray(a)) {
        a.sort();
        medSubj.next(a[Math.floor(a.length / 2)]);
      }
      return from(a);
    }),
    bufferWhen(() => medians$)
  );
  sourceObs.subscribe(
    numbers => {
      // console.log(numbers.length)
      position = typeof position === 'undefined' ? Math.floor(numbers.length / 2) : position;
      // console.log(position);
      if (numbers.length <= 5) {
        numbers.sort((a, b) => a - b);
        resolve(numbers[position]);
        return;
      }
      // can use recursion here too in future
      medians.sort((a, b) => a - b);
      const pivot = medians[Math.floor(medians.length / 2)];
      let bPivotSelf = false;
      for (const num of numbers) {
        if (num < pivot || (bPivotSelf && num === pivot)) {
          left.push(num);
        } else if (num > pivot) {
          right.push(num);
        } else {
          // if we don't have distinct values - we should skip just first pivot
          bPivotSelf = true;
        }
      }
      const k = left.length;
      // console.log(pivot, left, right);
      if (position < k) {
        getMedianOfMedians(from(left), position).then(result => resolve(result));
      } else if (position > k) {
        getMedianOfMedians(from(right), position - k - 1).then(result => resolve(result));
      } else {
        resolve(pivot);
      }
    }
  );
  });
}

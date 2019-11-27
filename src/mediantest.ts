import { from } from 'rxjs';

import getMedianOfMedians from './app/shared/utils/medianOfMedians2';

const array = [2, 43, 1, 432, 767, 87, 3, 2, 5, 6, 34, 12, 45, 6, 76, 78, 9, 8, 4, 32, 42];

const source$ = from(array);

getMedianOfMedians(source$).then(
  a => console.log(a)
);

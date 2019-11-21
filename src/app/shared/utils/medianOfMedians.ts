class SwappableArray<T> extends Array<T> {
  public constructor() {
    super();
  }
  public swapItems(a: number, b: number): SwappableArray<T> {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
  }
}

export class MedianOfMedians {

  private list: SwappableArray<number>;
  public median: number;

  constructor(list: Array<number>) {
    this.list = Object.assign(new SwappableArray<number>(), list);
    this.median = this.list[this.pivot(0, this.list.length - 1)];
  }
  partition5(left: number, right: number): number {
    // sort each 5 elements and find it median index
    let i = left + 1;
    while (i <= right) {
      let j = i;
      while (j > left && this.list[j - 1] > this.list[j]) {
        this.list.swapItems(j - 1, j);
        j--;
      }
      i++;
    }
    return Math.floor((left + right) / 2);
  }

  pivot(left: number, right: number): number {
    // for 5 or less elements just get median
    if (right - left < 5) {
      return this.partition5(left, right);
    }
    // otherwise move the medians of five-element subgroups to the first n/5 positions
    for (let i = left; i <= right; i += 5) {
      // get the median position of the i'th five-element subgroup
      let subRight = i + 4;
      if (subRight > right) {
        subRight = right;
      }
      const median5 = this.partition5(i, subRight);
      this.list.swapItems(median5, left + Math.floor((i - left) / 5));
    }
    // compute the median of the n/5 medians-of-five
    const mid = (right - left) / 10 + left + 1;
    return this.select(left, left + Math.floor((right - left) / 5), mid );
  }

  select(left: number, right: number, n: number): number {
    while (1) {
      if (left >= right) {
        return left;
      }
      let pivotIndex = this.pivot(left, right);
      pivotIndex = this.partition(left, right, pivotIndex, n);
      if (n === pivotIndex) {
        return n;
      } else if (n < pivotIndex) {
        right = pivotIndex - 1;
      } else {
        left = pivotIndex + 1;
      }
    }
  }
  partition(left: number, right: number, pivotIndex: number, n: number): number {

    const pivotValue = this.list[pivotIndex];
    this.list.swapItems(pivotIndex, right); // Move pivot to end

    let storeIndex = left;
    // Move all elements smaller than the pivot to the left of the pivot
    for (let i = left; i < right; i++) {
      if (this.list[i] < pivotValue) {
        this.list.swapItems(storeIndex, i);
        storeIndex++;
      }
    }
    // Move all elements equal to the pivot right after
    // the smaller elements
    let storeIndexEq = storeIndex;
    for (let i = storeIndex; i < right - 1; i++) {
        if (this.list[i] === pivotValue) {
          this.list.swapItems(storeIndexEq, i);
          storeIndexEq++;
        }
    }
    this.list.swapItems(right, storeIndexEq); // Move pivot to its final place
    // Return location of pivot considering the desired location n
    if (n < storeIndex) {
      return storeIndex; // n is in the group of smaller elements
    }
    if (n <= storeIndexEq) {
      return n; // n is in the group equal to pivot
    }
    return storeIndexEq; // n is in the group of larger elements
  }
}

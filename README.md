# Finding array's median
Different javascript implementations for median calculations
This project follows educational purposes.

Next technologies were used in this project: 
  - Angular 8
  - Dynamic component creation (with componentFactoryResolver)
  - Read ReadableStream from fetch, by chunks, parse and convert it to rx.js observables
  - The median of medians algorithm implementation (should be enchanced by finding medians from ReadableStream chunks, without merging it to big array, also wikipedia implementation does not looks correct)

**Installation**
```bash
git clone https://github.com/fivagod/median.git
cd median
npm i
// You can create your own custom array, just pass here counts of elements
npm run generate 100000
ng serve -o
```

**Demo**
You can see [demo here](https://fivagod.github.io/median/)
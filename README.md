# qsort-async
Async/Await style quicksort implementation in Javascript

## Install
```npm i qsort-async```

## Inspiration 
While working with a rather large dataset, I noticed that a sort was blocking all I/O operations for my
application. While this is fine for smaller arrays and datasets, I needed a sort that would yield to IO; specifically
input from devices and web server requests.

## Examples
For Numbers
```javascript
const quicksort = require('qsort-async');
const arr = [3, 1, 2];
await quicksort(arr, (one, two) => one - two);
// arr [1, 2, 3];
```

For Strings
```javascript
const quicksort = require('qsort-async');
const arr = ['c', 'a', 'b'];
await quicksort(arr, (one, two) => {
  if (one === two) {
    return 0;
  }
  return one > two ? 1 : -1;
});
// arr ['a', 'b', 'c'];
```

## API
### sort ( array, compare, [ size=10000 ] )
- array - The array to sort in place
- compare - function to compare elements of array
- size - The size minimum at which setImmediate is skipped
  - if your compare function takes some time to execute, consider lowering this to yield to the eventloop/io more often
  - in theory, you could lower this all the way to 1, but this does not make sense for smaller arrays

## TODO
Add a version that accepts an async comparator... but do you need it?
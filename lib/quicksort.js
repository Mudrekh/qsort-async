const immediate = require('util').promisify(setImmediate);

const DEFAULT_AWAIT_SIZE = 10000;

function swap(items, left, right) {
  const temp = items[left];
  items[left] = items[right];
  items[right] = temp;
}

function partition(items, compare, left, right) {
  const pivot = items[Math.floor((right + left) / 2)]; // eslint-disable-line no-magic-numbers
  let i = left;
  let j = right;
  while (i <= j) {
    while (compare(items[i], pivot) < 0) {
      i++;
    }
    while (compare(items[j], pivot) > 0) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, compare, left, right, size) {
  let index;
  if (items.length > 1) {
    index = partition(items, compare, left, right);
    if (Math.abs(left - right) > size) {
      await immediate();
    }
    if (left < index - 1) {
      await quickSort(items, compare, left, index - 1, size);
    }
    if (index < right) {
      await quickSort(items, compare, index, right, size);
    }
  }
  return items;
}

async function sort(arr, compare, size = DEFAULT_AWAIT_SIZE) {
  if (!(arr instanceof Array)) {
    throw new TypeError('First argument must be an array');
  }
  if (!(compare instanceof Function)) {
    throw new TypeError('Second argument must be a function');
  }
  return quickSort(arr, compare, 0, arr.length - 1, size);
}

module.exports = sort;

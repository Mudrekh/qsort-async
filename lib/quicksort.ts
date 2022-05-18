const asyncOperate = globalThis.requestAnimationFrame || (globalThis as any).setImmediate || globalThis.setTimeout;
const immediate = () => new Promise(asyncOperate);

const DEFAULT_AWAIT_SIZE = 10000;

function swap<T>(items: T[], left: number, right: number) {
  const temp = items[left];
  items[left] = items[right];
  items[right] = temp;
}

type Compare<T> = (a: T, b: T) => number;

function partition<T>(items: T[], compare: Compare<T>, left: number, right: number) {
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

async function quickSort<T>(items: T[], compare: Compare<T>, left:number, right:number, size:number) {
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

export async function sort<T>(arr: T[], compare: Compare<T>, size = DEFAULT_AWAIT_SIZE) {
  if (!(arr instanceof Array)) {
    throw new TypeError('First argument must be an array');
  }
  if (!(compare instanceof Function)) {
    throw new TypeError('Second argument must be a function');
  }
  return quickSort(arr, compare, 0, arr.length - 1, size);
}

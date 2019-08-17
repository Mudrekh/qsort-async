require('chai').should();

const quicksort = require('../index.js');
describe('quicksort', () => {
  it('should sort an array of numbers', async () => {
    const arr = [3, 1, 2];
    await quicksort(arr, (one, two) => one - two);
    arr.should.eql([1, 2, 3]);
  });
  it('should sort an array of strings', async () => {
    const arr = ['c', 'a', 'b'];
    await quicksort(arr, (one, two) => {
      if (one === two) {
        return 0;
      }
      return one > two ? 1 : -1;
    });
    arr.should.eql(['a', 'b', 'c']);
  });
  it('should yield to other operations in the eventloop', async () => {
    const arr = [];
    const times = [];
    for (let i = 0; i < 1000000; i++) {
      arr.push(Math.floor(Math.random() * 1000000000));
    }
    const interval = setInterval(() => times.push(Date.now()), 2);
    await quicksort(arr, (one, two) => one - two);
    clearInterval(interval);
    // See we yield
    times.should.have.length.above(10);
  }).timeout(10000);
});

describe('default sort', () => {
  it('should show that the default sort does not yield to the eventloop', () => {
    const arr = [];
    const times = [];
    for (let i = 0; i < 1000000; i++) {
      arr.push(Math.floor(Math.random() * 1000000000));
    }
    const interval = setInterval(() => times.push(Date.now()), 2);
    arr.sort((one, two) => one - two);
    clearInterval(interval);
    // Big oof
    times.should.have.length.below(3);
  }).timeout(10000);
});

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
});

// example test case
'use strict';

require('../test-header');
/**
 * example test
 * unnecessarily async just for demo purpose
 */
describe('Example lib', function () {
  it("Test foo", function (done) {
    const example = _LIB.example;
    expect(example.foo()).to.be.equals('Hello World');
    done();
  });
});

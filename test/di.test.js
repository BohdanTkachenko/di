const { expect } = require('chai');
const di = require('../');

describe('di', () => {
  it('should annotate class and get it', () => {
    class Dep1 {
      op(a, b) {
        return a + b;
      }
    }
    di.annotate(Dep1);

    class Dep2 {
      op(a, b) {
        return a * b;
      }
    }
    di.annotate(Dep2);

    class Test {
      constructor(dep1, dep2) {
        this.dep1 = dep1;
        this.dep2 = dep2;
      }

      test(a, b) {
        return this.dep2.op(this.dep1.op(a, b), 4);
      }
    }
    di.annotate(Test, [Dep1, Dep2]);

    const cls = di.get(Test);
    expect(cls).to.be.instanceOf(Test);
    expect(cls.dep1).to.be.instanceOf(Dep1);
    expect(cls.dep2).to.be.instanceOf(Dep2);
    expect(cls.test(2, 5)).to.be.equal(28);
  });
});

function* LazyList(from, until) {
    let i = from;
    const stop = until ? i => i >= until : () => false;
    while (true) {
        if (!stop(i)) {
            yield i;
        } else {
            return i;
        }
        i += 1;
    }
}

LazyList.prototype.take = function (n) {
    const res = [];
    for (let i = 0; i < n; i++) {
        const { value, done } = this.next();
        res.push(value);
        if (done) {
            break;
        }
    }
    return res;
};

LazyList.prototype.toArray = function () {
    const res = [];
    while (true) {
        const { value, done } = this.next();
        if (value) {
            res.push(value);
        }
        if (done) {
            break;
        }
    }
    return res;
};

LazyList.prototype.withMap = function (fn) {
    return {
        next: () => {
            const { value, done } = this.next();
            return { value: fn(value), done };
        },
        ...api,
        [Symbol.iterator]: () => {
            return this;
        },
    };
};

LazyList.prototype.withFilter = function (fn) {
    return {
        next: () => {
            while (true) {
                const { value, done } = this.next();
                if (fn(value)) {
                    return { value, done };
                }
            }
        },
        ...api,
        [Symbol.iterator]: () => {
            return this;
        },
    };
};

const api = {
    take: LazyList.prototype.take,
    toArray: LazyList.prototype.toArray,
    withMap: LazyList.prototype.withMap,
    withFilter: LazyList.prototype.withFilter,
};

let xs = LazyList(1, 10).toArray();
console.log(xs);

xs = LazyList(1).withFilter(x => x % 13 === 0).take(10);
console.log(xs);

xs = LazyList(1).withMap(x => x * x * x).take(10);
console.log(xs);

xs = LazyList(1).withFilter(x => x % 13 === 0).withMap(x => x * x * x).take(5);
console.log(xs);

xs = LazyList(1).withFilter(x => x % 13 === 0).withMap(Math.sqrt).take(5);
console.log(xs);

// See usage examples below

export class Option {
    value = undefined;

    // unit :: a -> Option a
    static unit(value) {
        if ((value === null) || (value === undefined)) {
            // eslint-disable-next-line no-use-before-define
            return none;
        }
        // eslint-disable-next-line no-use-before-define
        return new Some(value);
    };

    // ap :: # M a -> (a -> b) -> M a -> M b
    static ap(f) {
        // eslint-disable-next-line no-use-before-define
        return ma => ma.flatMap(a => Option.unit(f(a)));
    }

    // flatMap :: # Option a -> (a -> Option b) -> Option b
    flatMap(f) {
        const r = f(this.value);
        // eslint-disable-next-line no-use-before-define
        return r.equals(none) ? none : r;
    }

    // map :: # Option a -> (a -> b) -> Option b
    map(f) {
        return this.flatMap(x => Option.unit(f(x)));
    }

    // getOr :: # Option a -> b -> a | b
    getOr() {
        return this.value;
    }

    forEach(f) {
        f(this.value);
    }

    //  # M a => (a -> bool) -> (a -> m b) -> (a -> m c) -> m b | mc
    ifElse(fcond, f1, f2) {
        return this.map(fcond).map(x => x ? f1(this.value) : f2(this.value));
    }

    // # M a => a -> m a + console.log(a)
    debug(tag = "") {
        // eslint-disable-next-line no-console
        console.log(tag, this.toString());
        return this;
    }
}

export class Some extends Option {
    constructor(value) {
        super();
        this.value = value;
    }

    // eslint-disable-next-line class-methods-use-this
    equals(x) {
        return x instanceof Some && x.value === this.value;
    }

    toString() {
        return `Some(${this.value})`;
    }
}

export class None extends Option {
    // eslint-disable-next-line class-methods-use-this
    constructor() {
        super();
        delete this.value;
    }

    map() {
        return this;
    }

    // eslint-disable-next-line class-methods-use-this
    getOr(alternative) {
        return alternative;
    }

    // eslint-disable-next-line class-methods-use-this
    equals(x) {
        return x instanceof None;
    }


    // eslint-disable-next-line class-methods-use-this
    toString() {
        return "None";
    }
}

// Cached None class value
export const none = new None();
export const some = x => Some.unit(x);

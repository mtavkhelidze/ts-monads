// See usage examples below

export abstract class Option<T> {
    value?: T;

    // unit :: a -> Option a
    static unit<T>(value: T | null | undefined): Option<T> {
        if ((value === null) || (value === undefined)) {
            return None;
        }
        return new _Some(value);
    };

    abstract getOrElse(alternative: T): T;

    //
    // // ap :: # M a -> (a -> b) -> (M a -> M b)
    // static ap<T, R>(f: (a: T) => R) {
    //     return (ma: Option<T>) => ma.flatMap(a => Option.unit(f(a)));
    // }
    //
    // // flatMap :: # Option a -> (a -> Option b) -> Option b
    // flatMap<B>(f: (a: A) => Option<B>) {
    //     const r = f(this.value);
    //     // eslint-disable-next-line no-use-before-define
    //     return r.equals(None) ? None : r;
    // }
    //
    // // map :: # Option a -> (a -> b) -> Option b
    // map(f) {
    //     return this.flatMap(x => Option.unit(f(x)));
    // }
    //
    // // getOrElse :: # Option a -> b -> a | b
    // getOrElse() {
    //     return this.value;
    // }
    //
    // forEach(f) {
    //     f(this.value);
    // }
    //
    // //  # M a => (a -> bool) -> (a -> m b) -> (a -> m c) -> m b | mc
    // ifElse(fcond, f1, f2) {
    //     return this.map(fcond).map(x => x ? f1(this.value) : f2(this.value));
    // }
    //
    // // # M a => a -> m a + console.log(a)
    // debug(tag = "") {
    //     // eslint-disable-next-line no-console
    //     console.log(tag, this.toString());
    //     return this;
    // }
}

export class _Some<T> extends Option<T> {
    value: T;
    constructor(value: T) {
        super();
        this.value = value;
    }

    getOrElse(_: T): T {
        return this.value;
    }


    equals(x: T) {
        return x instanceof _Some && x.value === this.value;
    }

    toString() {
        return `Some(${this.value})`;
    }
}

export class _None<T> extends Option<T> {
    constructor() {
        super();
        delete this.value;
    }

    getOrElse(alternative: T): T {
        return alternative;
    }

    //
    // map() {
    //     return this;
    // }

    // eslint-disable-next-line class-methods-use-this
    equals(x: T) {
        return x instanceof None;
    }


    // eslint-disable-next-line class-methods-use-this
    toString() {
        return "None";
    }
}

// Cached None class value
export const None: any = new _None();
export const Some = <T>(x: T) => _Some.unit(x);

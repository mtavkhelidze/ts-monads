// See usage examples below

abstract class Option<T> {
    // @ts-ignore
    value: T;

    // unit :: a -> M a
    static unit<T>(value: T | null | undefined): Option<T> {
        if ((value === null) || (value === undefined)) {
            return None;
        }
        return new _Some(value);
    };

    // getOrElse :: a -> a
    abstract getOrElse(alternative: T): T;

    // equals :: M a -> Bool
    abstract equals<R>(x: Option<R>): boolean;

    // flatMap :: (a -> M b) -> M b
    flatMap<R>(f: (a: T) => Option<R>): Option<R> {
        const r = f(this.value);
        return r.equals(None) ? None : r;
    }

    // map :: (a -> b) -> Option b
    map<R>(f: (x: T) => R): Option<R> {
        return this.flatMap(x => Option.unit(f(x)));
    }

    //
    // // ap :: # M a -> (a -> b) -> (M a -> M b)
    // static ap<T, R>(f: (a: T) => R) {
    //     return (ma: Option<T>) => ma.flatMap(a => Option.unit(f(a)));
    // }
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

class _Some<T> extends Option<T> {
    value: T;
    constructor(value: T) {
        super();
        this.value = value;
    }

    getOrElse(_: T): T {
        return this.value;
    }


    equals<R>(x: R): boolean {
        return x instanceof _Some && x.value === this.value;
    }

    toString() {
        return `Some(${this.value})`;
    }
}

class _None<T> extends Option<T> {
    constructor() {
        super();
        delete this.value;
    }

    getOrElse(alternative: T): T {
        return alternative;
    }

    map<R>(_: (x: T) => R): _None<R> {
        return None;
    }

    equals<R>(x: R): boolean {
        return x instanceof _None;
    }

    toString() {
        return "None";
    }
}

export const None: any = new _None();
export const Some = <T>(x: T) => _Some.unit(x);
export const unit = Option.unit;

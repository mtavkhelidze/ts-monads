export abstract class Option<T> {
    // @ts-ignore
    value: T;

    static unit<T>(value: T | null | undefined): Option<T> {
        if ((value === null) || (value === undefined)) {
            return None;
        }
        return new _Some(value);
    };

    abstract getOrElse<R>(alternative: T): T | R;

    abstract equals<R>(x: Option<R>): boolean;

    abstract forEach(f: (t: T) => void): void;

    // flatMap :: (a -> M b) -> M b
    flatMap<R>(f: (a: T) => Option<R>): Option<R> {
        const r = f(this.value);
        return r.equals(None) ? None : r;
    }

    // map :: (a -> b) -> Option b
    map<R>(f: (x: T) => R): Option<R> {
        return this.flatMap(x => Option.unit(f(x)));
    }

    debug(tag: string = ""): Option<T> {
        console.log(tag, this.toString());
        return this;
    }
}

class _Some<T> extends Option<T> {
    value: T;

    constructor(value: T) {
        super();
        this.value = value;
    }

    getOrElse<R>(_: R): T {
        return this.value;
    }


    equals<R>(x: R): boolean {
        return x instanceof _Some && x.value === this.value;
    }

    toString() {
        return `Some(${this.value})`;
    }

    forEach(f: (t: T) => void): void {
        f(this.value);
    }
}

class _None<T> extends Option<T> {
    constructor() {
        super();
    }

    getOrElse<R>(alternative: R): R {
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

    forEach(_: (t: T) => void): void {
        // nothing
    }
}

export const None: any = new _None();
export const Some = <T>(x: T) => _Some.unit(x);
export const unit = Option.unit;

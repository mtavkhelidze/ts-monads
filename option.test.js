import { none, Option, some } from "./option";

describe("Option", () => {
    describe("#getOr", () => {
        it("returns `or` if argument is None", () => {
            expect(none.getOr("some")).toEqual("some");
        });

        it("returns argument value if argument is Some", () => {
            expect(
              some("other").map(() => null).getOr("something"),
            ).toEqual("something");
        });
    });

    describe("#equals", () => {
        it("returns true on same values", () => {
            expect(some(1)).toEqual(some(1));
        });
        it("returns false on different values", () => {
            expect(some(1)).not.toEqual(some(2));
        });
        it("is not None", () => {
            expect(some(1)).not.toEqual(none);
        });
        it("handles objects correctly", () => {
            expect(some({ one: 1 }).equals(some("[object Object]"))).toBeFalsy();
        });
        it("handles none correctly", () => {
            expect(none.equals(none)).toBeTruthy();
        });
        it("none is not some", () => {
            expect(none.equals(some(10))).toBeFalsy();
        });
    });

    describe("#unit", () => {
        it("wraps value into Some", () => {
            expect(Option.unit(1)).toEqual(some(1));
        });
        it("of undefined is None", () => {
            expect(Option.unit(undefined)).toEqual(none);
        });
        it("of null is None", () => {
            expect(Option.unit(null)).toEqual(none);
        });
    });

    describe("#map", () => {
        it("Option(value).map(fn) returns Option(fn(value))", () => {
            expect(some(1).map(x => x + 1).equals(some(2))).toBeTruthy();
        });
        it("None.map(fn) returns None", () => {
            expect(none.map(x => x + 1)).toEqual(none);
        });
    });

    describe("#flatMap", () => {
        it("returns None if fn(x) == none", () => {
            expect(some(1).flatMap(() => none)).toEqual(none);
        });
        it("returns Some(y) if fn(x) == Some(y)", () => {
            expect(some(10).flatMap(x => some(x + 1))).toEqual(some(11));
        });
    });

    describe("#ap", () => {
        const lifted = Option.ap(x => x * 2);
        it("lifts a function to accept Optional", () => {
            expect(lifted).toBeInstanceOf(Function);
        });
        it("lifted(Optional) returns Optional with applied value", () => {
            const initialOptional = some(10);
            const expectedOptional = some(20);
            expect(
              lifted(initialOptional).equals(expectedOptional)).toBeTruthy();
        });
    });
});

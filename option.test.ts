import test from "tape";

import { None, Some } from "./option";

test("#getOrElse", t => {
    t.equal(
      None.getOrElse("some"),
      "some",
      "returns alternative value if argument is None",
    );

    t.equal(
      Some("one").getOrElse("two"),
      "one",
      "returns argument value if argument is Some",
    );

    t.end();
});


test("#equals", t => {
    t.true(
      Some(1).equals(Some(1)),
      "returns true on same values",
    );

    t.false(
      Some(1).equals(Some(2)),
      "returns false on different values",
    );

    t.false(
      Some(1).equals(None),
      "is not None",
    );

    t.false(
      Some({ one: 1 }).equals(Some("[object Object]")),
      "handles objects correctly",
    );

    t.true(
      None.equals(None),
      "handles None correctly",
    );

    t.false(
      None.equals(Some(10)),
      "None is not Some",
    );

    t.end();
});

//
// describe("#unit", () => {
//     it("wraps value into Some", () => {
//         expect(Option.unit(1)).toEqual(Some(1));
//     });
//     it("of undefined is None", () => {
//         expect(Option.unit(undefined)).toEqual(None);
//     });
//     it("of null is None", () => {
//         expect(Option.unit(null)).toEqual(None);
//     });
// });
//
// describe("#map", () => {
//     it("Option(value).map(fn) returns Option(fn(value))", () => {
//         expect(Some(1).map(x => x + 1).equals(Some(2))).toBeTruthy();
//     });
//     it("None.map(fn) returns None", () => {
//         expect(None.map(x => x + 1)).toEqual(None);
//     });
// });
//
// describe("#flatMap", () => {
//     it("returns None if fn(x) == None", () => {
//         expect(Some(1).flatMap(() => None)).toEqual(None);
//     });
//     it("returns Some(y) if fn(x) == Some(y)", () => {
//         expect(Some(10).flatMap(x => Some(x + 1))).toEqual(Some(11));
//     });
// });
//
// describe("#ap", () => {
//     const lifted = Option.ap(x => x * 2);
//     it("lifts a function to accept Optional", () => {
//         expect(lifted).toBeInstanceOf(Function);
//     });
//     it("lifted(Optional) returns Optional with applied value", () => {
//         const initialOptional = Some(10);
//         const expectedOptional = Some(20);
//         expect(
//           lifted(initialOptional).equals(expectedOptional)).toBeTruthy();
//     });
// });

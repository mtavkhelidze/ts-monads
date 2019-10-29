import test from "tape";

import { None, Some, unit } from "./option";

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

test("#unit", t => {
    t.true(
      unit(1).equals(Some(1)),
      "wraps value into Some",
    );

    t.true(
      unit(undefined).equals(None),
      "of undefined is None",
    );

    t.true(
      unit(null).equals(None),
      "of null is None",
    );

    t.end();
});

test("#flatMap", t => {
    t.equal(
      Some(1).flatMap(() => None), None,
      "returns None if fn(x) == None",
    );

    t.true(
      Some(10).flatMap(x => Some(x + 1)).equals(Some(11)),
      "returns Some(y) if fn(x) == Some(y)",
    );

    t.end();
});

test("#map", t => {
    t.true(
      Some(1).map(x => x + 1).equals(Some(2)),
      "Option(value).map(fn) returns Option(fn(value))",
    );

    t.equal(None.map((x: number) => x + 1), None,
      "None.map(fn) returns None",
    );

    t.end();
});

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

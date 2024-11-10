import { add } from "@/helpers/add";

describe("add", () => {
  test("should add two numbers", () => {
    const res = add(2, 2);

    expect(res).toEqual(4);
  });

  test("should make sure precision max 2", () => {
    const res = add(2.3333, 2.5555);

    expect(res).toEqual(4.89);
  });
});

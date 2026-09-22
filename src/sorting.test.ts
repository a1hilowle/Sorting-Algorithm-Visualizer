import { describe, expect, it } from "vitest";
import { algorithmNames, applyStep, generateSteps } from "./sorting";

describe.each(algorithmNames)("%s", algorithm => {
  it.each([
    { input: [] }, { input: [1] }, { input: [4, 1, 3, 1, 0, 8] },
    { input: [5, 4, 3, 2, 1] }, { input: [1, 2, 3, 4, 5] },
  ])("sorts $input", ({ input }) => {
    const original = [...input];
    const output = generateSteps(input, algorithm).reduce(applyStep, input);
    expect(output).toEqual([...input].sort((a, b) => a - b));
    expect(input).toEqual(original);
  });
});

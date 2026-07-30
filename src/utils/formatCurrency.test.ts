import { describe, it, expect } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("formats a whole number", () => {
    expect(formatCurrency(10)).toBe("$10.00");
  });

  it("formats a decimal", () => {
    expect(formatCurrency(9.5)).toBe("$9.50");
  });
});

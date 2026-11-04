import { describe, expect, it } from "vitest";
import { validateJobInput } from "../src/services/validation.service";

describe("validateJobInput", () => {
  it("requires a job title", () => {
    expect(validateJobInput({ company: "Acme" })).toBe("Please enter a job title.");
  });
  it("requires a company", () => {
    expect(validateJobInput({ jobTitle: "Developer" })).toBe("Please enter a company name.");
  });
  it("accepts an HTTPS URL", () => {
    expect(validateJobInput({ jobTitle: "Developer", company: "Acme", jobUrl: "https://example.com/job" })).toBeNull();
  });
  it("rejects invalid URLs", () => {
    expect(validateJobInput({ jobTitle: "Developer", company: "Acme", jobUrl: "not-a-url" })).toBe("Please enter a valid job URL.");
  });
});
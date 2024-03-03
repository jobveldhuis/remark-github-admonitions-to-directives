import { describe, expect, it } from "vitest";
import { GithubAlertType } from "./github-alert.type.js";
import { parseGithubAlertDeclaration } from "./is-github-alert-declaration.js";

describe("is-github-alert-declaration", () => {
  it("should return false when passing an empty string.", () => {
    const result = parseGithubAlertDeclaration("");
    expect(result).toBe(false);
  });

  it("should return false when passing a string that's not a Github alert declaration.", () => {
    const resultOne = parseGithubAlertDeclaration("test");
    expect(resultOne).toBe(false);

    const resultTwo = parseGithubAlertDeclaration("[!TEST]");
    expect(resultTwo).toBe(false);
  });

  it("should return the alert type when passing a string that is a Github alert declaration.", () => {
    const resultNote = parseGithubAlertDeclaration("[!NOTE]");
    expect(resultNote).toBe(GithubAlertType.NOTE);

    const resultTip = parseGithubAlertDeclaration("[!TIP]");
    expect(resultTip).toBe(GithubAlertType.TIP);

    const resultImportant = parseGithubAlertDeclaration("[!IMPORTANT]");
    expect(resultImportant).toBe(GithubAlertType.IMPORTANT);

    const resultWarning = parseGithubAlertDeclaration("[!WARNING]");
    expect(resultWarning).toBe(GithubAlertType.WARNING);

    const resultCaution = parseGithubAlertDeclaration("[!CAUTION]");
    expect(resultCaution).toBe(GithubAlertType.CAUTION);
  });

  it("should ignore whitespace.", () => {
    const resultPrefix = parseGithubAlertDeclaration(" [!NOTE]");
    expect(resultPrefix).toBe(GithubAlertType.NOTE);

    const resultPostfix = parseGithubAlertDeclaration("[!NOTE] ");
    expect(resultPostfix).toBe(GithubAlertType.NOTE);

    const resultWrapped = parseGithubAlertDeclaration(" [!NOTE] ");
    expect(resultWrapped).toBe(GithubAlertType.NOTE);
  });
});

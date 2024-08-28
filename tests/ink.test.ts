import { ink } from "../src";

describe("ink", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("should handle empty color array", () => {
    console.log(ink.text("This is default text"));
    expect(consoleLogSpy).toHaveBeenCalledWith("This is default text");
  });

  it("should handle single color", () => {
    console.log(ink.red.text("This is red text"));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "\x1b[31mThis is red text\x1b[0m"
    );
  });

  it("should handle background color", () => {
    console.log(ink.bgWhite.text("This is text with white background"));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "\x1b[47mThis is text with white background\x1b[0m"
    );
  });

  it("should handle multiple colors", () => {
    console.log(ink.red.bgWhite.text("This is red text on a white background"));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "\x1b[31m\x1b[47mThis is red text on a white background\x1b[0m"
    );
  });

  it("should handle bright colors", () => {
    console.log(ink.brightRed.text("This is bright red text"));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "\x1b[91mThis is bright red text\x1b[0m"
    );
  });

  it("should handle bright background colors", () => {
    console.log(
      ink.bgBrightWhite.text("This is text with bright white background")
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "\x1b[107mThis is text with bright white background\x1b[0m"
    );
  });

  it("should handle multiple chained colors", () => {
    console.log(
      ink.brightRed.bgBrightWhite.text(
        "This is bright red text on a bright white background"
      )
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "\x1b[91m\x1b[107mThis is bright red text on a bright white background\x1b[0m"
    );
  });
});

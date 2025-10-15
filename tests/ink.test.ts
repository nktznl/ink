import { effects, ink, log, themes } from '../src';

describe('ink', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should handle empty color array', () => {
    console.log(ink.text('This is default text'));
    expect(consoleLogSpy).toHaveBeenCalledWith('This is default text');
  });

  it('should handle single color', () => {
    console.log(ink.red.text('This is red text'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[31mThis is red text\x1b[0m'
    );
  });

  it('should handle background color', () => {
    console.log(ink.bgWhite.text('This is text with white background'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[47mThis is text with white background\x1b[0m'
    );
  });

  it('should handle multiple colors', () => {
    console.log(ink.red.bgWhite.text('This is red text on a white background'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[31m\x1b[47mThis is red text on a white background\x1b[0m'
    );
  });

  it('should handle bright colors', () => {
    console.log(ink.brightRed.text('This is bright red text'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[91mThis is bright red text\x1b[0m'
    );
  });

  it('should handle bright background colors', () => {
    console.log(
      ink.bgBrightWhite.text('This is text with bright white background')
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[107mThis is text with bright white background\x1b[0m'
    );
  });

  it('should handle multiple chained colors', () => {
    console.log(
      ink.brightRed.bgBrightWhite.text(
        'This is bright red text on a bright white background'
      )
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[91m\x1b[107mThis is bright red text on a bright white background\x1b[0m'
    );
  });

  it('should handle styles', () => {
    console.log(ink.bold.text('This is bold text'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[1mThis is bold text\x1b[0m'
    );
  });

  it('should handle combined styles and colors', () => {
    console.log(ink.bold.red.text('This is bold red text'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[1m\x1b[31mThis is bold red text\x1b[0m'
    );
  });
});

describe('themes', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should apply success theme', () => {
    console.log(themes.success.text('Success message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[32mSuccess message\x1b[0m'
    );
  });

  it('should apply error theme', () => {
    console.log(themes.error.text('Error message'));
    expect(consoleLogSpy).toHaveBeenCalledWith('\x1b[31mError message\x1b[0m');
  });
});

describe('log', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should log success messages with icon', () => {
    log.success('Operation completed');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[32m✓ Operation completed\x1b[0m'
    );
  });

  it('should log error messages with icon', () => {
    log.error('Something went wrong');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[31m✗ Something went wrong\x1b[0m'
    );
  });

  it('should log warning messages with icon', () => {
    log.warning('This is a warning');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[33m⚠ This is a warning\x1b[0m'
    );
  });

  it('should log info messages with icon', () => {
    log.info('This is info');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '\x1b[34mℹ This is info\x1b[0m'
    );
  });
});

describe('effects', () => {
  it('should apply rainbow effect', () => {
    const result = effects.rainbow('ABC');
    expect(result).toContain('\x1b[31mA\x1b[0m'); // red A
    expect(result).toContain('\x1b[33mB\x1b[0m'); // yellow B
    expect(result).toContain('\x1b[32mC\x1b[0m'); // green C
  });

  it('should apply gradient effect', () => {
    const result = effects.gradient('AB', 'red', 'blue');
    expect(result).toContain('\x1b[31mA\x1b[0m'); // red A
    expect(result).toContain('\x1b[34mB\x1b[0m'); // blue B
  });

  it('should apply random effect', () => {
    const result = effects.random('AB');
    // Just check that it has color codes and letters
    expect(result.length).toBeGreaterThan(2); // Should have color codes
    expect(result).toContain('A');
    expect(result).toContain('B');
  });
});

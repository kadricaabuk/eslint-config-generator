import { jest } from '@jest/globals';
import { run } from '../cli';
import prompts from 'prompts';
import fs from 'fs';
import path from 'path';
import { Framework, Feature, ConfigFormat } from '../types';

jest.mock('prompts');
jest.mock('fs');
jest.mock('path');

const mockPrompts = prompts as jest.Mocked<typeof prompts>;

describe('CLI', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle user cancellation', async () => {
    mockPrompts.mockResolvedValueOnce({ proceed: false });

    const result = await run({ interactive: true });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Operation cancelled');
  });

  it('should create eslint config file with user inputs', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.React,
      typescript: true,
      features: [Feature.Prettier, Feature.Import],
      style: {
        quotes: 'single',
        semi: true,
        trailingComma: 'es5'
      }
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config).toBeDefined();
  });

  it('should handle existing config file', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    mockPrompts
      .mockResolvedValueOnce({
        framework: Framework.React,
        typescript: true,
        features: [Feature.Prettier]
      })
      .mockResolvedValueOnce({ overwrite: false });

    const result = await run({ interactive: true });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Operation cancelled');
  });

  it('should handle errors gracefully', async () => {
    mockPrompts.mockRejectedValueOnce(new Error('Test error'));

    const result = await run({ interactive: true });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Test error');
  });

  it('should handle new frameworks', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.Svelte,
      typescript: true,
      features: [Feature.Prettier]
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config?.framework).toBe(Framework.Svelte);
  });

  it('should handle new features', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.React,
      typescript: true,
      features: [Feature.Prettier, Feature.Performance]
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config?.features).toContain(Feature.Performance);
  });

  it('should handle new style options', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.React,
      typescript: true,
      features: [Feature.Prettier],
      style: {
        quotes: 'backtick',
        semi: false
      }
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config?.style?.quotes).toBe('backtick');
  });

  it('should handle invalid configurations', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: 'invalid' as Framework,
      typescript: true
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should handle framework and feature combinations', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.React,
      typescript: true,
      features: [Feature.Redux, Feature.MobX]
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config?.features).toContain(Feature.Redux);
  });

  it('should handle different configuration formats', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.React,
      typescript: true,
      features: [Feature.Prettier],
      configFormat: ConfigFormat.YAML
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config?.configFormat).toBe(ConfigFormat.YAML);
  });

  it('should handle edge cases and errors', async () => {
    mockPrompts.mockRejectedValueOnce(new Error('Network error'));

    const result = await run({ interactive: true });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Network error');
  });

  it('should handle environment combinations', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.React,
      typescript: true,
      features: [Feature.Prettier],
      environment: ['browser', 'node']
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config?.environment).toContain('browser');
    expect(result.config?.environment).toContain('node');
  });

  it('should handle different style combinations', async () => {
    mockPrompts.mockResolvedValueOnce({
      framework: Framework.React,
      typescript: true,
      features: [Feature.Prettier],
      style: {
        quotes: 'single',
        semi: true,
        trailingComma: 'all',
        bracketSpacing: true
      }
    });

    const result = await run({ interactive: true });
    expect(result.success).toBe(true);
    expect(result.config?.style?.trailingComma).toBe('all');
  });
}); 
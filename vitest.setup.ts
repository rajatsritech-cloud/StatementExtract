import { afterEach, beforeEach, vi } from "vitest";

const originalEnv = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  process.env = { ...originalEnv };
});

afterEach(() => {
  vi.clearAllMocks();
});

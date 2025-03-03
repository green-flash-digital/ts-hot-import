import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "fs/promises";
import path from "path";
import { hotImport } from "./index.js";

// Mocking TempFile and esbuild
vi.mock("ts-jolt/node", () => ({
  TempFile: class {
    filePath = path.resolve("/tmp/mock.mjs");
    async create(contents: string, _extension: string) {
      await fs.writeFile(this.filePath, contents);
      return this.filePath;
    }
    cleanup() {
      fs.unlink(this.filePath).catch(() => {});
    }
  },
}));

vi.mock("esbuild", () => ({
  build: vi.fn().mockResolvedValue({
    outputFiles: [
      {
        contents: Buffer.from("export default { hello: 'world' };"),
      },
    ],
  }),
}));

// Test suite
describe("hotImport", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should dynamically import a transpiled TypeScript module", async () => {
    const module = await hotImport<{ default: { hello: string } }>(
      "/path/to/module.ts"
    );
    expect(module.default.hello).toBe("world");
  });
});

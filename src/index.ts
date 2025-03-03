import * as esbuild from "esbuild";
import { TempFile } from "ts-jolt/node";

/**
 * Dynamically transpiles and imports a TypeScript module as an ESModule.
 *
 * This function uses `esbuild` to transpile the provided TypeScript file into
 * a JavaScript ESModule, writes it to a temporary file, and then dynamically
 * imports it using the native `import()` function. The temporary file is
 * automatically cleaned up after import.
 *
 * @example
 * // Import a TypeScript module dynamically
 * const module = await hotImport<MyModuleType>('./path/to/module.ts');
 * console.log(module.default);
 *
 */
export async function hotImport<T extends Record<string, unknown>>(
  tsFilePath: string,
  options?: { tsconfig?: string }
) {
  const tsconfig = options?.tsconfig ?? "ts-jolt/tsconfig/library";

  const result = await esbuild.build({
    entryPoints: [tsFilePath],
    tsconfig,
    write: false,
  });
  const outputFile = result.outputFiles[0];
  const outputFileContents = Buffer.from(outputFile.contents).toString("utf-8");
  const tempFile = new TempFile();
  const filePath = await tempFile.create(outputFileContents, "mjs");
  const configModule = await import(`file://${filePath}`);
  tempFile.cleanup();
  return configModule as T;
}

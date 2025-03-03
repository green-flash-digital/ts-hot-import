import { build } from "esbuild";
import { TempFile } from "ts-jolt/node";

export async function hotImport<T extends Record<string, unknown>>(
  tsFilePath: string,
  options?: { tsconfigRaw?: string }
) {
  const tsconfigRaw =
    options?.tsconfigRaw ?? JSON.stringify("ts-jolt/tsconfig/library");

  const result = await build({
    entryPoints: [tsFilePath],
    tsconfigRaw,
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

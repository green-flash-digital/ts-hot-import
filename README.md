<div align="center" style="padding-bottom: 30px">
  <img align="center" width="30%" src="./images/ts-hot-import-logo-transparent-2x.png" style="margin: 0 auto;"/>
  <h1 style="margin: 0 auto;">
    ts-hot-import
  </h1><br />
  <p>Dynamically transpile and import a TypeScript module on the fly from a file path.</p>
</div >

## Welcome!

`ts-hot-import` allows you to load TypeScript files directly from a file path without the need for a build step. It uses esbuild to transpile your TypeScript code into an ESModule and dynamically imports it at runtime. Perfect for CLI tools, dynamic configurations, and any scenario where flexibility and speed matter.

## Installation

```bash
# yarn
yarn add ts-hot-import

# npm
npm install ts-hot-import
```

## Usage

Provided a TS file a particular path such as the below

```ts
// Example TypeScript module
export default function () {
  console.log("Hello from the dynamically imported module!");
}
```

You can import the `hotImport` function to transpile, import, and then load the contents of the file without having to worry about a build step.

```ts
import { hotImport } from "ts-hot-import";

interface MyModule {
  default: () => void;
}

async function loadModule() {
  const module = await hotImport<MyModule>("./path/to/module.ts");
  module.default();

  // logs 'Hello from the dynamically imported module!'
}

loadModule();
```

## Documentation

Check out the `ts-hot-import` documentation: https://ts-hot-import.greenflash.digital

## Organization

Check out the company behind `ts-hot-import`: https://greenflash.digital

# Changelog

## v0.1.4

2025-03-03

### 🐛 Fixed

- Updates `ts-jolt` to directly stringify the tsconfig into the raw esbuild params

## v0.1.3

2025-03-03

### 🐛 Fixed

- Reverts back to `tsconfigRaw` to ensure that we can extend the custom `tsconfig`

## v0.1.2

2025-03-03

### 🐛 Fixed

- Updates the `tsconfig` option to use a configuration instead of the raw output

## v0.1.1

2025-03-03

### 🐛 Fixed

- Import `esbuild` as CommonJS to execute in external contexts

## v0.1.0

2025-03-03

### 🚀 Added

This is the first minor iteration that can be used in production

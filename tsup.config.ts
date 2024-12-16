import { defineConfig } from 'tsup';

export default defineConfig({
    minify: true,
    sourcemap: false,
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
})